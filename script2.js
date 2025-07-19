
let questions = ["I have strong beliefs about what is right and wrong, good and bad.", "I often act without considering the possible consequences.", "I tend to solve problems using a step-by-step approach.", "I believe that formal procedures and policies restrict people.", "I have a reputation for saying what I think, simply and directly.", "I often find that actions based on feelings are as sound as those based on careful thought and analysis.", "I like the sort of work where I have time for thorough preparation and implementation.", "I regularly question people about their basic assumptions.", "What matters most is whether something works in practice.", "I actively seek out new experiences.", "When I hear about a new idea or approach I immediately start working out how to apply it in practice.", "I am keen on self-discipline such as watching my diet, taking regular exercise, sticking to a fixed routine etc.", "I take pride in doing a thorough job.", "I get on best with logical, analytical people and less well with spontaneous, \"irrational\" people.", "I take care over the interpretation of data available to me and avoid jumping to conclusions.", "I like to reach a decision carefully after weighing up many alternatives.", "I'm attracted more to novel, unusual ideas than to practical ones.", "I don't like disorganised things and prefer to fit things into a coherent pattern.", "I accept and stick to laid down procedures and policies so long as I regard them as an efficient way of getting the job done.", "I like to relate my actions to a general principle.", "In discussions I like to get straight to the point.", "I tend to have distant, rather formal relationships with people at work.", "I thrive on the challenge of tackling something new and different.", "I enjoy fun-loving, spontaneous people.", "I pay meticulous attention to detail before coming to a conclusion.", "I find it difficult to produce ideas on impulse.", "I believe in coming to the point immediately.", "I am careful not to jump to conclusions too quickly.", "I prefer to have as many sources of information as possible - the more data to mull over the better.", "Flippant people who don't take things seriously enough usually irritate me.", "I listen to other people's point of view before putting my own forward.", "I tend to be open about how I'm feeling.", "In discussions I enjoy watching the manoeuvrings of the other participants.", "I prefer to respond to events on a spontaneous, flexible basis rather than plan things out in advance.", "I tend to be attracted to techniques such as network analysis, flow charts, branching programmes, contingency planning, etc.", "It worries me if I have to rush out a piece of work to meet a tight deadline.", "I tend to judge people's ideas on their practical merits.", "Quiet, thoughtful people tend to make me feel uneasy.", "I often get irritated by people who want to rush things.", "It is more important to enjoy the present moment than to think about the past or future.", "I think that decisions based on a thorough analysis of all the information are sounder than those based on intuition.", "I tend to be a perfectionist.", "In discussions I usually produce lots of spontaneous ideas.", "In meetings I put forward practical realistic ideas.", "More often than not, rules are there to be broken.", "I prefer to stand back from a situation and consider all the perspectives.", "I can often see inconsistencies and weaknesses in other people's arguments.", "On balance I talk more than I listen.", "I can often see better, more practical ways to get things done.", "I think written reports should be short and to the point.", "I believe that rational, logical thinking should win the day.", "I tend to discuss specific things with people rather than engaging in social discussion.", "I like people who approach things realistically rather than theoretically.", "In discussions I get impatient with irrelevancies and digressions.", "If I have a report to write I tend to produce lots of drafts before settling on the final version.", "I am keen to try things out to see if they work in practice.", "I am keen to reach answers via a logical approach.", "I enjoy being the one that talks a lot.", "In discussions I often find I am the realist, keeping people to the point and avoiding wild speculations.", "I like to ponder many alternatives before making up my mind.", "In discussions with people I often find I am the most dispassionate and objective.", "In discussions I'm more likely to adopt a \"low profile\" than to take the lead and do most of the talking.", "I like to be able to relate current actions to a longer-term bigger picture.", "When things go wrong I am happy to shrug it off and \"put it down to experience\".", "I tend to reject wild, spontaneous ideas as being impractical.", "It's best to think carefully before taking action.", "On balance I do the listening rather than the talking.", "I tend to be tough on people who find it difficult to adopt a logical approach.", "Most times I believe the end justifies the means.", "I don't mind hurting people's feelings so long as the job gets done.", "I find the formality of having specific objectives and plans stifling.", "I'm usually one of the people who puts life into a party.", "I do whatever is expedient to get the job done.", "I quickly get bored with methodical, detailed work.", "I am keen on exploring the basic assumptions, principles and theories underpinning things and events.", "I'm always interested to find out what people think.", "I like meetings to be run on methodical lines, sticking to laid down agenda, etc.", "I steer clear of subjective or ambiguous topics.", "I enjoy the drama and excitement of a crisis situation.", "People often find me insensitive to their feelings."];
let currentQuestion = 0;
let scores = {
    "Activist": 0,
    "Reflector": 0,
    "Theorist": 0,
    "Pragmatist": 0
};

function showQuestion() {
    const container = document.getElementById("question-container");
    if (currentQuestion < questions.length) {
        container.innerHTML = `
            <div id="question-text">{questions[currentQuestion]}</div>
            <div class="buttons">
                <button onclick="submitAnswer(true)">✔️ Agree</button>
                <button onclick="submitAnswer(false)">❌ Disagree</button>
            </div>
        `;
    } else {
        showResults();
    }
}

function submitAnswer(agree) {
    if (agree) {
        const style = question_styles[currentQuestion];
        if (style) {
            scores[style]++;
        }
    }
    currentQuestion++;
    showQuestion();
}

function showResults() {
    const container = document.getElementById("question-container");
    container.innerHTML = `
        <canvas id="radarChart" width="400" height="400"></canvas>
        <br>
        <a href="analysis.html?scores=" + encodeURIComponent(JSON.stringify(scores)) + ">View Analysis</a>
    `;
    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('radarChart').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Activist', 'Reflector', 'Theorist', 'Pragmatist'],
            datasets: [{
                label: 'Your Learning Style Scores',
                data: [
                    scores['Activist'],
                    scores['Reflector'],
                    scores['Theorist'],
                    scores['Pragmatist']
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        },
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 20
                }
            }
        }
    });
}

const question_styles = {"1": "Activist", "3": "Activist", "5": "Activist", "9": "Activist", "16": "Activist", "22": "Activist", "23": "Activist", "31": "Activist", "33": "Activist", "37": "Activist", "39": "Activist", "42": "Activist", "44": "Activist", "47": "Activist", "57": "Activist", "63": "Activist", "70": "Activist", "71": "Activist", "73": "Activist", "78": "Activist", "6": "Reflector", "12": "Reflector", "14": "Reflector", "15": "Reflector", "24": "Reflector", "27": "Reflector", "28": "Reflector", "30": "Reflector", "32": "Reflector", "35": "Reflector", "38": "Reflector", "40": "Reflector", "45": "Reflector", "51": "Reflector", "54": "Reflector", "59": "Reflector", "61": "Reflector", "65": "Reflector", "66": "Reflector", "75": "Reflector", "0": "Theorist", "2": "Theorist", "7": "Theorist", "11": "Theorist", "13": "Theorist", "17": "Theorist", "18": "Theorist", "19": "Theorist", "21": "Theorist", "25": "Theorist", "29": "Theorist", "41": "Theorist", "46": "Theorist", "50": "Theorist", "56": "Theorist", "60": "Theorist", "62": "Theorist", "67": "Theorist", "74": "Theorist", "77": "Theorist", "4": "Pragmatist", "8": "Pragmatist", "10": "Pragmatist", "20": "Pragmatist", "26": "Pragmatist", "34": "Pragmatist", "36": "Pragmatist", "43": "Pragmatist", "48": "Pragmatist", "49": "Pragmatist", "52": "Pragmatist", "53": "Pragmatist", "55": "Pragmatist", "58": "Pragmatist", "64": "Pragmatist", "68": "Pragmatist", "69": "Pragmatist", "72": "Pragmatist", "76": "Pragmatist", "79": "Pragmatist"};
window.onload = showQuestion;
