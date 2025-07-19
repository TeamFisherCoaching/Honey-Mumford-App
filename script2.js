
const questions = [
  "I have strong beliefs about what is right and wrong, good and bad.",
  "I often act without considering the possible consequences.",
  "I tend to solve problems using a step-by-step approach.",
  "I believe that formal procedures and policies restrict people.",
  "I have a reputation for saying what I think, simply and directly.",
  "I often find that actions based on feelings are as sound as those based on careful thought and analysis.",
  "I like the sort of work where I have time for thorough preparation and implementation.",
  "I regularly question people about their basic assumptions.",
  "What matters most is whether something works in practice.",
  "I actively seek out new experiences."
];

const scoring = {
  Activist: [2, 4, 6, 10],
  Reflector: [7],
  Theorist: [1, 3, 8],
  Pragmatist: [5, 9]
};

let currentQuestion = 0;
let scores = { Activist: 0, Reflector: 0, Theorist: 0, Pragmatist: 0 };

function submitAnswer(agree) {
  const qNum = currentQuestion + 1;
  if (agree) {
    for (let style in scoring) {
      if (scoring[style].includes(qNum)) {
        scores[style]++;
      }
    }
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    document.getElementById("question-text").innerText = questions[currentQuestion];
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  document.getElementById("result-text").innerText = JSON.stringify(scores, null, 2);

  const ctx = document.getElementById('radarChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Activist', 'Reflector', 'Theorist', 'Pragmatist'],
      datasets: [{
        label: 'Your Learning Style Profile',
        data: [
          scores.Activist,
          scores.Reflector,
          scores.Theorist,
          scores.Pragmatist
        ],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: 'rgba(54, 162, 235, 1)'
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 10
        }
      }
    }
  });
}

function emailResults() {
  const subject = encodeURIComponent("My Learning Styles Results");
  const body = encodeURIComponent("Here are my results:\n" + JSON.stringify(scores, null, 2));
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

window.onload = () => {
  document.getElementById("question-text").innerText = questions[currentQuestion];
};
