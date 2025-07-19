const QUESTIONS_URL="questions1.json";
const STYLE_MAP=[
"Activist","Activist","Theorist","Activist","Activist","Reflector","Theorist","Theorist","Pragmatist","Activist",
"Pragmatist","Reflector","Reflector","Theorist","Activist","Pragmatist","Reflector","Reflector","Theorist","Pragmatist",
"Pragmatist","Activist","Pragmatist","Activist","Reflector","Theorist","Reflector","Reflector","Reflector","Activist",
"Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Reflector","Activist","Pragmatist",
"Pragmatist","Reflector","Theorist","Activist","Activist","Theorist","Pragmatist","Reflector","Theorist","Reflector",
"Activist","Pragmatist","Theorist","Reflector","Activist","Pragmatist","Activist","Pragmatist","Reflector","Reflector",
"Theorist","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Pragmatist",
"Activist","Theorist","Pragmatist","Reflector","Theorist","Activist","Pragmatist","Activist","Theorist","Pragmatist"];
let questions=[],current=0;const scores={Activist:0,Reflector:0,Theorist:0,Pragmatist:0};
async function initQuiz(){questions=await fetch(QUESTIONS_URL).then(r=>r.json());document.getElementById("agree-btn").addEventListener("click",()=>submitAnswer(true));document.getElementById("disagree-btn").addEventListener("click",()=>submitAnswer(false));showQuestion();}
function showQuestion(){document.getElementById("question-text").textContent=questions[current];document.getElementById("progress").textContent=`${current+1}/${questions.length}`;}
function submitAnswer(agree){if(agree){const style=STYLE_MAP[current];scores[style]++;}current++;if(current<questions.length){showQuestion();}else{finishQuiz();}}
function finishQuiz(){document.getElementById("question-container").classList.add("hidden");document.getElementById("result-container").classList.remove("hidden");renderMiniChart();const params=new URLSearchParams({activist:scores.Activist,reflector:scores.Reflector,theorist:scores.Theorist,pragmatist:scores.Pragmatist});document.getElementById("analysis-link").href=`analysis.html?${params.toString()}`;}
function renderMiniChart(){const ctx=document.getElementById("radarChart").getContext("2d");new Chart(ctx,{type:"radar",data:{labels:Object.keys(scores),datasets:[{label:"Scores",data:Object.values(scores),backgroundColor:"rgba(0,230,255,0.2)",borderColor:"rgba(0,230,255,1)",borderWidth:2}]},options:{scales:{r:{suggestedMin:0,suggestedMax:20}}}});}
document.addEventListener("DOMContentLoaded",initQuiz);
