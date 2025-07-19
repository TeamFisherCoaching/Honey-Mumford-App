/* Analysis page script with PDF + email */
function parseScores(){
  const p = new URLSearchParams(window.location.search);
  return {
    Activist:+p.get("Activist")||+p.get("activist")||0,
    Reflector:+p.get("Reflector")||+p.get("reflector")||0,
    Theorist:+p.get("Theorist")||+p.get("theorist")||0,
    Pragmatist:+p.get("Pragmatist")||+p.get("pragmatist")||0
  };
}
const scores = parseScores();

function renderChart(){
  const ctx=document.getElementById("radarChart").getContext("2d");
  new Chart(ctx,{
    type:"radar",
    data:{labels:Object.keys(scores),
      datasets:[{label:"Scores",data:Object.values(scores),
        backgroundColor:"rgba(0,207,255,0.2)",borderColor:"rgba(0,207,255,1)",borderWidth:2}]},
    options:{scales:{r:{suggestedMin:0,suggestedMax:20}}}
  });
}

function renderScoreLine(){
  document.getElementById("score-values").innerHTML=
    `Activist: ${scores.Activist} &nbsp;|&nbsp; `+
    `Reflector: ${scores.Reflector} &nbsp;|&nbsp; `+
    `Theorist: ${scores.Theorist} &nbsp;|&nbsp; `+
    `Pragmatist: ${scores.Pragmatist}`;
}

function setEmailLink(){
  const body=`Here are my Honey & Mumford scores:%0D%0AActivist: ${scores.Activist}%0D%0AReflector: ${scores.Reflector}%0D%0ATheorist: ${scores.Theorist}%0D%0APragmatist: ${scores.Pragmatist}%0D%0A`;
  document.getElementById("email-link").href=`mailto:?subject=My Honey & Mumford Results&body=${body}`;
}

async function generatePDF(){
  const pdf = new jspdf.jsPDF();
  const target = document.querySelector("main");
  const canvas = await html2canvas(target,{backgroundColor:null});
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = (canvas.height * pageWidth)/canvas.width;
  pdf.addImage(canvas,"PNG",0,10,pageWidth,pageHeight);
  pdf.save("honey-mumford-report.pdf");
}

function isSpikey(s){const v=Object.values(s);return Math.max(...v)-Math.min(...v)>=8;}
function dominant(s){const m=Math.max(...Object.values(s));return Object.keys(s).filter(k=>s[k]===m);}
function summaryText(dom,spike){
  const desc={Activist:"Learns by doing and enjoys new experiences.",
              Reflector:"Learns by observing and thinking before acting.",
              Theorist:"Learns by understanding theories and models.",
              Pragmatist:"Learns by applying ideas in practical situations."};
  let html="<h2>Summary</h2>";
  dom.forEach(st=>html+=`<p><strong>${st}:</strong> ${desc[st]}</p>`);
  if(spike){html+="<p><em>Your profile is spikey, indicating strong preferences in some styles over others.</em></p>";}
  return html;
}
function prosConsText(dom){
  const data={Activist:{pros:["Energetic and enthusiastic","Open to new experiences","Good at brainstorming","Quick to take action","Enjoys group work"],cons:["May act without thinking","Can get bored easily","May overlook details","Dislikes repetition","Can be impulsive"]},
              Reflector:{pros:["Careful and thoughtful","Good at listening","Analyzes thoroughly","Avoids jumping to conclusions","Prefers structured approach"],cons:["May delay decisions","Can be overly cautious","Avoids spotlight","May miss opportunities","Needs time to adapt"]},
              Theorist:{pros:["Logical and objective","Enjoys complex ideas","Seeks clarity and structure","Good at planning","Values rationality"],cons:["May be inflexible","Dislikes ambiguity","Can be overly critical","May struggle with emotions","Prefers theory over practice"]},
              Pragmatist:{pros:["Practical and realistic","Focuses on results","Likes trying out ideas","Efficient and organized","Good at problem-solving"],cons:["May ignore theory","Dislikes open-ended discussions","Can be impatient","Focuses on short-term","Avoids abstract ideas"]}};
  let html="<h2>Pros &amp; Cons</h2>";
  dom.forEach(st=>{
    html+=`<h3>${st}</h3><strong>Pros:</strong><ul>`;
    data[st].pros.forEach(p=>html+=`<li>${p}</li>`);
    html+="</ul><strong>Cons:</strong><ul>";
    data[st].cons.forEach(c=>html+=`<li>${c}</li>`);
    html+="</ul>";
  });
  return html;
}

document.addEventListener("DOMContentLoaded",()=>{
  renderChart();
  renderScoreLine();
  setEmailLink();
  document.getElementById("pdf-btn").addEventListener("click",generatePDF);

  const dom=dominant(scores);
  document.getElementById("summary").innerHTML=summaryText(dom,isSpikey(scores));
  document.getElementById("pros-cons").innerHTML=prosConsText(dom);
});
