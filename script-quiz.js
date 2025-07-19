const QUESTIONS_URL="questions1.json";
const STYLE_MAP=[ /* same array as previous */ "Activist","Activist","Theorist","Activist","Activist","Reflector","Theorist","Theorist","Pragmatist","Activist","Pragmatist","Reflector","Reflector","Theorist","Activist","Pragmatist","Reflector","Reflector","Theorist","Pragmatist","Pragmatist","Activist","Pragmatist","Activist","Reflector","Theorist","Reflector","Reflector","Reflector","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Reflector","Activist","Pragmatist","Pragmatist","Reflector","Theorist","Activist","Activist","Theorist","Pragmatist","Reflector","Theorist","Reflector","Activist","Pragmatist","Theorist","Reflector","Activist","Pragmatist","Activist","Pragmatist","Reflector","Reflector","Theorist","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Pragmatist","Activist","Theorist","Pragmatist","Reflector","Theorist","Activist","Pragmatist","Activist","Theorist","Pragmatist"];
let questions=[],current=0;
const scores={Activist:0,Reflector:0,Theorist:0,Pragmatist:0};

async function initQuiz(){
  document.getElementById("hero").classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");

  questions=await fetch(QUESTIONS_URL).then(r=>r.json());
  document.getElementById("agree-btn").addEventListener("click",()=>submitAnswer(true));
  document.getElementById("disagree-btn").addEventListener("click",()=>submitAnswer(false));
  showQuestion();
}

function showQuestion(){
  document.getElementById("question-text").textContent=questions[current];
  document.getElementById("progress").textContent=`${current+1}/${questions.length}`;
}

function submitAnswer(agree){
  if(agree){
    scores[STYLE_MAP[current]]++;
  }
  current++;
  if(current<questions.length){
    showQuestion();
  }else{
    finishQuiz();
  }
}

function finishQuiz(){
  document.getElementById("question-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");
  renderMiniChart();
  renderScoreValues("score-values");

  const params=new URLSearchParams(scores);
  document.getElementById("analysis-link").href=`analysis.html?${params.toString()}`;

  // build email link
  const mailBody=`Here are my Honey & Mumford scores:%0D%0AActivist: ${scores.Activist}%0D%0AReflector: ${scores.Reflector}%0D%0ATheorist: ${scores.Theorist}%0D%0APragmatist: ${scores.Pragmatist}%0D%0A`;
  document.getElementById("email-link-mini").href=`mailto:?subject=My Honey & Mumford Results&body=${mailBody}`;
}

function renderMiniChart(){
  const ctx=document.getElementById("radarChart").getContext("2d");
  new Chart(ctx,{
    type:"radar",
    data:{
      labels:Object.keys(scores),
      datasets:[{
        label:"Scores",
        data:Object.values(scores),
        backgroundColor:"rgba(0,230,255,0.2)",
        borderColor:"rgba(0,230,255,1)",
        borderWidth:2
      }]
    },
    options:{scales:{r:{suggestedMin:0,suggestedMax:20}}}
  });
}

function renderScoreValues(elID){
  document.getElementById(elID).innerHTML=`Activist: ${scores.Activist} &nbsp;|&nbsp; Reflector: ${scores.Reflector} &nbsp;|&nbsp; Theorist: ${scores.Theorist} &nbsp;|&nbsp; Pragmatist: ${scores.Pragmatist}`;
}

document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("start-btn").addEventListener("click",initQuiz);
});
