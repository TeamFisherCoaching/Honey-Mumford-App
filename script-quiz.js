/* Honey & Mumford – Quiz Script (Level 5) */
const QUESTIONS_URL = "questions1.json";
const STORAGE_KEY = "hm_progress_v1";

// 80‑item mapping
const STYLE_MAP = [/* truncated for brevity in example */"Activist","Activist","Theorist","Activist","Activist","Reflector","Theorist","Theorist","Pragmatist","Activist","Pragmatist","Reflector","Reflector","Theorist","Activist","Pragmatist","Reflector","Reflector","Theorist","Pragmatist","Pragmatist","Activist","Pragmatist","Activist","Reflector","Theorist","Reflector","Reflector","Reflector","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Reflector","Activist","Pragmatist","Pragmatist","Reflector","Theorist","Activist","Activist","Theorist","Pragmatist","Reflector","Theorist","Reflector","Activist","Pragmatist","Theorist","Reflector","Activist","Pragmatist","Activist","Pragmatist","Reflector","Reflector","Theorist","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Pragmatist","Activist","Theorist","Pragmatist","Reflector","Theorist","Activist","Pragmatist","Activist","Theorist","Pragmatist"];

let questions = [];
let current = 0;
let scores = { Activist:0, Reflector:0, Theorist:0, Pragmatist:0 };
let chart; // mini chart instance

// Restore from storage if exists
function loadProgress(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if(!saved) return false;
  try{
    const obj = JSON.parse(saved);
    current = obj.current || 0;
    scores = obj.scores || scores;
    return true;
  }catch(e){ return false; }
}
function saveProgress(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({current,scores}));
}

async function startQuiz(){
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  questions = await fetch(QUESTIONS_URL).then(r=>r.json());

  // Set up event listeners once
  ["agree-btn","disagree-btn"].forEach(id=>{
    document.getElementById(id).addEventListener("click", e=>submitAnswer(id==="agree-btn"));
  });

  // Swipe gestures
  const qContainer = document.getElementById("question-container");
  let touchStartX = null;
  qContainer.addEventListener("pointerdown", e=>{touchStartX = e.clientX;});
  qContainer.addEventListener("pointerup", e=>{
    if(touchStartX===null) return;
    const dx = e.clientX - touchStartX;
    if(Math.abs(dx) > 50){
      submitAnswer(dx>0); // right swipe = Yes
    }
    touchStartX = null;
  });

  showQuestion();
}

function showQuestion(){
  if(current>=questions.length){ finishQuiz(); return; }
  document.getElementById("question-text").textContent = questions[current];
  document.getElementById("progress").textContent = `${current+1}/${questions.length}`;
  saveProgress();
}

function submitAnswer(yes){
  if(yes){ scores[STYLE_MAP[current]]++; }
  current++;
  current<questions.length ? showQuestion() : finishQuiz();
}

function finishQuiz(){
  localStorage.removeItem(STORAGE_KEY); // clear progress
  document.getElementById("question-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");
  renderMiniChart();
  renderScoreValues("score-values");

  const params = new URLSearchParams(scores);
  document.getElementById("analysis-link").href = `analysis.html?${params.toString()}`;
  const emailBody = `Here are my Honey & Mumford scores:%0D%0AActivist: ${scores.Activist}%0D%0AReflector: ${scores.Reflector}%0D%0ATheorist: ${scores.Theorist}%0D%0APragmatist: ${scores.Pragmatist}%0D%0A`;
  document.getElementById("email-link-mini").href = `mailto:?subject=My Honey & Mumford Results&body=${emailBody}`;
  document.getElementById("pdf-btn-mini").addEventListener("click", ()=>generatePDF("snapshot"));
}

function renderMiniChart(){
  const ctx = document.getElementById("radarChart").getContext("2d");
  chart = new Chart(ctx,{
    type:"radar",
    data:{ labels:Object.keys(scores),
      datasets:[{ label:"Scores",
        data:Object.values(scores),
        backgroundColor:"rgba(0,207,255,0.2)",
        borderColor:"rgba(0,207,255,1)",
        borderWidth:2 }]},
    options:{ responsive:true, maintainAspectRatio:false,
      scales:{ r:{ suggestedMin:0, suggestedMax:20 } } }
  });
}

function renderScoreValues(el){
  document.getElementById(el).innerHTML =
    `Activist: ${scores.Activist} &nbsp;|&nbsp; `+
    `Reflector: ${scores.Reflector} &nbsp;|&nbsp; `+
    `Theorist: ${scores.Theorist} &nbsp;|&nbsp; `+
    `Pragmatist: ${scores.Pragmatist}`;
}

// PDF generation (snapshot only)
async function generatePDF(mode){
  const pdf = new jspdf.jsPDF();
  // capture chart area
  const target = document.querySelector(mode==="snapshot"?"#result-container":"body");
  const canvas = await html2canvas(target, {backgroundColor:null});
  const imgData = canvas.toDataURL("image/png",1.0);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth) / canvas.width;
  pdf.addImage(imgData,"PNG",0,10,pageWidth,pageHeight);
  pdf.save("honey-mumford-results.pdf");
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.getElementById("start-btn").addEventListener("click", startQuiz);
  if(loadProgress()){
    // Offer to resume
    const resume = confirm("Resume your previous questionnaire?");
    if(resume){ startQuiz(); } else { localStorage.removeItem(STORAGE_KEY); }
  }
});
