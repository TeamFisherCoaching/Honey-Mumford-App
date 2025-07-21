
// app.js
const statements = [
  "I have strong beliefs about what is right and wrong, good and bad.",
  "I often act without considering the possible consequences.",
  "I tend to solve problems using a step-by-step approach.",
  "I believe that formal procedures and policies restrict people.",
  "I have a reputation for saying what I think, simply and directly.",
  "I often find that actions based on feelings are as sound as those based on careful thought and analysis.",
  "I like the sort of work where I have time for thorough preparation and implementation.",
  "I regularly question people about their basic assumptions.",
  "What matters most is whether something works in practice.",
  "I actively seek out new experiences.",
  "When I hear about a new idea or approach I immediately start working out how to apply it in practice.",
  "I am keen on self-discipline such as watching my diet, taking regular exercise, sticking to a fixed routine etc.",
  "I take pride in doing a thorough job.",
  "I get on best with logical, analytical people and less well with spontaneous, \"irrational\" people.",
  "I take care over the interpretation of data available to me and avoid jumping to conclusions.",
  "I like to reach a decision carefully after weighing up many alternatives.",
  "I'm attracted more to novel, unusual ideas than to practical ones.",
  "I don't like disorganised things and prefer to fit things into a coherent pattern.",
  "I accept and stick to laid down procedures and policies so long as I regard them as an efficient way of getting the job done.",
  "I like to relate my actions to a general principle.",
  "In discussions I like to get straight to the point.",
  "I tend to have distant, rather formal relationships with people at work.",
  "I thrive on the challenge of tackling something new and different.",
  "I enjoy fun-loving, spontaneous people.",
  "I pay meticulous attention to detail before coming to a conclusion.",
  "I find it difficult to produce ideas on impulse.",
  "I believe in coming to the point immediately.",
  "I am careful not to jump to conclusions too quickly.",
  "I prefer to have as many sources of information as possible - the more data to mull over the better.",
  "Flippant people who don't take things seriously enough usually irritate me.",
  "I listen to other people's point of view before putting my own forward.",
  "I tend to be open about how I'm feeling.",
  "In discussions I enjoy watching the manoeuvrings of the other participants.",
  "I prefer to respond to events on a spontaneous, flexible basis rather than plan things out in advance.",
  "I tend to be attracted to techniques such as network analysis, flow charts, branching programmes, contingency planning, etc.",
  "It worries me if I have to rush out a piece of work to meet a tight deadline.",
  "I tend to judge people's ideas on their practical merits.",
  "Quiet, thoughtful people tend to make me feel uneasy.",
  "I often get irritated by people who want to rush things.",
  "It is more important to enjoy the present moment than to think about the past or future.",
  "I think that decisions based on a thorough analysis of all the information are sounder than those based on intuition.",
  "I tend to be a perfectionist.",
  "In discussions I usually produce lots of spontaneous ideas.",
  "In meetings I put forward practical realistic ideas.",
  "More often than not, rules are there to be broken.",
  "I prefer to stand back from a situation and consider all the perspectives.",
  "I can often see inconsistencies and weaknesses in other people's arguments.",
  "On balance I talk more than I listen.",
  "I can often see better, more practical ways to get things done.",
  "I think written reports should be short and to the point.",
  "I believe that rational, logical thinking should win the day.",
  "I tend to discuss specific things with people rather than engaging in social discussion.",
  "I like people who approach things realistically rather than theoretically.",
  "In discussions I get impatient with irrelevancies and digressions.",
  "If I have a report to write I tend to produce lots of drafts before settling on the final version.",
  "I am keen to try things out to see if they work in practice.",
  "I am keen to reach answers via a logical approach.",
  "I enjoy being the one that talks a lot.",
  "In discussions I often find I am the realist, keeping people to the point and avoiding wild speculations.",
  "I like to ponder many alternatives before making up my mind.",
  "In discussions with people I often find I am the most dispassionate and objective.",
  "In discussions I'm more likely to adopt a \"low profile\" than to take the lead and do most of the talking.",
  "I like to be able to relate current actions to a longer-term bigger picture.",
  "When things go wrong I am happy to shrug it off and \"put it down to experience\".",
  "I tend to reject wild, spontaneous ideas as being impractical.",
  "It's best to think carefully before taking action.",
  "On balance I do the listening rather than the talking.",
  "I tend to be tough on people who find it difficult to adopt a logical approach.",
  "Most times I believe the end justifies the means.",
  "I don't mind hurting people's feelings so long as the job gets done.",
  "I find the formality of having specific objectives and plans stifling.",
  "I'm usually one of the people who puts life into a party.",
  "I do whatever is expedient to get the job done.",
  "I quickly get bored with methodical, detailed work.",
  "I am keen on exploring the basic assumptions, principles and theories underpinning things and events.",
  "I'm always interested to find out what people think.",
  "I like meetings to be run on methodical lines, sticking to laid down agenda, etc.",
  "I steer clear of subjective or ambiguous topics.",
  "I enjoy the drama and excitement of a crisis situation.",
  "People often find me insensitive to their feelings."
];
const styleMap   = [
  "T",
  "A",
  "T",
  "A",
  "P",
  "A",
  "R",
  "T",
  "P",
  "A",
  "P",
  "T",
  "R",
  "T",
  "R",
  "R",
  "A",
  "T",
  "P",
  "T",
  "P",
  "T",
  "A",
  "A",
  "R",
  "T",
  "P",
  "R",
  "R",
  "T",
  "R",
  "A",
  "R",
  "A",
  "P",
  "R",
  "P",
  "A",
  "R",
  "A",
  "R",
  "T",
  "A",
  "P",
  "A",
  "R",
  "T",
  "A",
  "P",
  "P",
  "T",
  "R",
  "P",
  "P",
  "R",
  "P",
  "T",
  "A",
  "P",
  "R",
  "T",
  "R",
  "T",
  "A",
  "P",
  "R",
  "R",
  "T",
  "P",
  "P",
  "A",
  "A",
  "P",
  "A",
  "T",
  "R",
  "T",
  "T",
  "A",
  "P"
  "P"
];

const scoresInit = {activist:0,reflector:0,theorist:0,pragmatist:0};
let qIndex = 0;
let scores = {...scoresInit};

const quizCard   = document.getElementById('quizCard');
const resultCard = document.getElementById('resultCard');
const noDataCard = document.getElementById('noDataCard');
+const introCard  = document.getElementById('introCard');   // NEW
+const beginBtn   = document.getElementById('beginBtn');

const progressEL = document.getElementById('progress');
const statementEL= document.getElementById('statement');
const agreeBtn   = document.getElementById('agreeBtn');
const disagreeBtn= document.getElementById('disagreeBtn');

const scActivist   = document.getElementById('scActivist');
const scReflector  = document.getElementById('scReflector');
const scTheorist   = document.getElementById('scTheorist');
const scPragmatist = document.getElementById('scPragmatist');
const dominantEL   = document.getElementById('dominantStyle');

const retakeBtn = document.getElementById('retakeBtn');
const startBtn  = document.getElementById('startBtn');

(function init(){
  let raw = null;
  try { raw = localStorage.getItem('honeyMumfordScores'); }
  catch(e){ console.warn('localStorage unavailable', e); }

  // Wire the Start button
  beginBtn.onclick = () => showQuestion();

  if (raw) {
    try {
      scores = JSON.parse(raw);
      if (validScores(scores)) {
        showResults();      // returning visitor → jump to their chart
        return;
      }
    } catch(e) {
      console.warn('Bad JSON in storage', e);
    }
  }

  // First‑time visitor → stay on the intro card
  introCard.hidden = false;
})();


function showQuestion(){
  introCard.hidden  = true;
  resultCard.hidden=true;
  noDataCard.hidden=true;
  quizCard.hidden=false;
  if(qIndex>=statements.length){ saveAndShowResults(); return; }
  progressEL.textContent = `${qIndex+1} / ${statements.length}`;
  statementEL.textContent = statements[qIndex];
  agreeBtn.onclick    = () => answer(true);
  disagreeBtn.onclick = () => answer(false);
}

function answer(isAgree){
  if(isAgree){
    const style = styleMap[qIndex];
    switch(style){ case 'A': scores.activist++; break; case 'R': scores.reflector++; break; case 'T': scores.theorist++; break; case 'P': scores.pragmatist++; break; }
  }
  qIndex++; showQuestion();
}

function saveAndShowResults(){
  try{ localStorage.setItem('honeyMumfordScores', JSON.stringify(scores)); }catch(e){ console.warn('Save error',e); }
  showResults();
}

let chart;
function showResults(){
  quizCard.hidden=true;
  resultCard.hidden=false;
  noDataCard.hidden=true;
  scActivist.textContent=scores.activist;
  scReflector.textContent=scores.reflector;
  scTheorist.textContent=scores.theorist;
  scPragmatist.textContent=scores.pragmatist;
  const [domStyle,domScore] = Object.entries(scores).reduce((a,b)=>a[1]>=b[1]?a:b);
  dominantEL.textContent = `Your dominant style is ${domStyle[0].toUpperCase()+domStyle.slice(1)} (${domScore}).`;
  if(chart) chart.destroy();
  waitForSize(resultCard, ()=>{
    const ctx=document.getElementById('resultChart');
    chart = new Chart(ctx,{
      type:'radar',
      data:{ labels:['Activist','Reflector','Theorist','Pragmatist'], datasets:[{ data:[scores.activist,scores.reflector,scores.theorist,scores.pragmatist], fill:true, borderWidth:2 }] },
      options:{ responsive:true, maintainAspectRatio:false, scales:{ r:{ beginAtZero:true, max:20, ticks:{ stepSize:5 } } }, plugins:{ legend:{ display:false } } }
    });
    new ResizeObserver(()=>chart.resize()).observe(resultCard);
  });
}

function waitForSize(el,cb){ const{width,height}=el.getBoundingClientRect(); if(width&&height) cb(); else requestAnimationFrame(()=>waitForSize(el,cb)); }
function validScores(o){ return o && ['activist','reflector','theorist','pragmatist'].every(k=>typeof o[k]==='number'); }

retakeBtn.onclick=startOver; startBtn.onclick=startOver;
function startOver(){ localStorage.removeItem('honeyMumfordScores'); scores={...scoresInit}; qIndex=0; showQuestion(); }
