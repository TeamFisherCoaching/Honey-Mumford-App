
let currentQuestion = 0;
let questions = [];
let scores = {
    Activist: 0,
    Reflector: 0,
    Theorist: 0,
    Pragmatist: 0
};

// Mapping from question number (1-based) to learning style
const styleMap = {
    Activist: [2, 4, 6, 10, 17, 23, 24, 32, 34, 38, 40, 43, 45, 48, 58, 64, 71, 72, 74, 79],
    Reflector: [7, 13, 15, 16, 25, 28, 29, 31, 33, 36, 39, 41, 46, 52, 55, 60, 62, 66, 67, 76],
    Theorist: [1, 3, 8, 12, 14, 18, 20, 22, 26, 30, 42, 47, 51, 54, 57, 61, 63, 68, 75, 78],
    Pragmatist: [5, 9, 11, 19, 21, 27, 35, 37, 44, 49, 50, 53, 56, 59, 65, 69, 70, 73, 77, 80]
};

function loadQuestions() {
    fetch('questions1.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        });
}

function showQuestion() {
    const container = document.getElementById('question-container');
    container.innerHTML = '';

    if (currentQuestion < questions.length) {
        const qText = document.createElement('div');
        qText.id = 'question-text';
        qText.textContent = `Q${currentQuestion + 1}: ${questions[currentQuestion]}`;
        container.appendChild(qText);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const tickBtn = document.createElement('button');
        tickBtn.textContent = '✔️ Tick';
        tickBtn.onclick = () => handleAnswer(true);

        const crossBtn = document.createElement('button');
        crossBtn.textContent = '❌ Cross';
        crossBtn.onclick = () => handleAnswer(false);

        buttonsDiv.appendChild(tickBtn);
        buttonsDiv.appendChild(crossBtn);
        container.appendChild(buttonsDiv);
    } else {
        showResults();
    }
}

function handleAnswer(ticked) {
    const qNum = currentQuestion + 1;
    if (ticked) {
        for (const style in styleMap) {
            if (styleMap[style].includes(qNum)) {
                scores[style]++;
            }
        }
    }
    currentQuestion++;
    showQuestion();
}

function showResults() {
    const container = document.getElementById('question-container');
    container.innerHTML = '<h2>All questions completed!</h2>';

    const canvas = document.createElement('canvas');
    canvas.id = 'radarChart';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Your Learning Style Scores',
                data: Object.values(scores),
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 20
                }
            }
        }
    });

    const link = document.createElement('a');
    link.href = `analysis.html?activist=${scores.Activist}&reflector=${scores.Reflector}&theorist=${scores.Theorist}&pragmatist=${scores.Pragmatist}`;
    link.textContent = 'View Your Analysis';
    link.style.display = 'block';
    link.style.marginTop = '20px';
    container.appendChild(link);
}

window.onload = loadQuestions;
