const QUESTIONS_URL="questions1.json";
const STYLE_MAP=["Activist","Activist","Theorist","Activist","Activist","Reflector","Theorist","Theorist","Pragmatist","Activist","Pragmatist","Reflector","Reflector","Theorist","Activist","Pragmatist","Reflector","Reflector","Theorist","Pragmatist","Pragmatist","Activist","Pragmatist","Activist","Reflector","Theorist","Reflector","Reflector","Reflector","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Reflector","Activist","Pragmatist","Pragmatist","Reflector","Theorist","Activist","Activist","Theorist","Pragmatist","Reflector","Theorist","Reflector","Activist","Pragmatist","Theorist","Reflector","Activist","Pragmatist","Activist","Pragmatist","Reflector","Reflector","Theorist","Activist","Activist","Reflector","Reflector","Pragmatist","Theorist","Reflector","Pragmatist","Pragmatist","Activist","Theorist","Pragmatist","Reflector","Theorist","Activist","Pragmatist","Activist","Theorist","Pragmatist"];
let questions=[],idx=0;
const scores={Activist:0,Reflector:0,Theorist:0,Pragmatist:0};
const qCard=()=>document.getElementById('q-card');

function startQuiz(){
  document.getElementById('hero').classList.add('hidden');
  qCard().classList.remove('hidden');
  fetch(QUESTIONS_URL).then(r=>r.json()).then(arr=>{questions=arr;showQuestion();});
  document.getElementById('yes-btn').onclick=()=>answer(true);
  document.getElementById('no-btn').onclick=()=>answer(false);
  setupSwipe();
}

function showQuestion(){
  if(idx>=questions.length) return finish();
  document.getElementById('q-text').textContent=questions[idx];
  document.getElementById('progress').textContent=`${idx+1}/${questions.length}`;
  if(idx===0) document.getElementById('swipe-hint').classList.remove('hidden');
}

function answer(yes){
  if(yes) scores[STYLE_MAP[idx]]++;
  idx++;
  showQuestion();
}

function finish(){
  qCard().classList.add('hidden');
  document.getElementById('snapshot').classList.remove('hidden');
  renderSnapshot();
  const params=new URLSearchParams(scores);
  document.getElementById('analysis-link').href=`analysis.html?${params.toString()}`;
}

function renderSnapshot(){
  const ctx=document.getElementById('snapChart').getContext('2d');
  new Chart(ctx,{type:'radar',data:{labels:Object.keys(scores),datasets:[{label:'Scores',data:Object.values(scores),backgroundColor:'rgba(0,207,255,.25)',borderColor:'rgba(0,207,255,1)',borderWidth:2}]},options:{scales:{r:{suggestedMin:0,suggestedMax:20}}}});
  document.getElementById('score-line').textContent=`Activist: ${scores.Activist} │ Reflector: ${scores.Reflector} │ Theorist: ${scores.Theorist} │ Pragmatist: ${scores.Pragmatist}`;
}

function setupSwipe(){
  let startX=null;
  qCard().addEventListener('pointerdown',e=>startX=e.clientX);
  qCard().addEventListener('pointerup',e=>{
    if(startX===null)return;
    const dx=e.clientX-startX;
    if(Math.abs(dx)>50) answer(dx>0);
    startX=null;
    document.getElementById('swipe-hint').classList.add('hidden');
  });
}

document.addEventListener('DOMContentLoaded',()=>document.getElementById('start-btn').addEventListener('click',startQuiz));
