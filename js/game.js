const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');
const spinner = document.getElementById('spinner');
const game = document.getElementById('game');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// fetching questions from API, game only works after promise's response.
fetch("https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple").then(res => {
    return res.json();
}).then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
        let fixedLoadedQuestion = loadedQuestion.question.replace(/&quot;/g,'"').replace(/&#039;/g, "'");
        const formattedQuestion = {
            question: fixedLoadedQuestion
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()* 3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index+1)] = choice.replace(/&quot;/g,'"').replace(/&#039;/g, "'");
        })
        return formattedQuestion;
    });

    startGame();

}).catch(error => {
    alert(error);
});

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    spinner.classList.add('hidden');
}

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //When there is no more questions we go to the end page and we store the score in localStorage
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    questionCounter++;

    // we update the progess to the UI
    progressText.innerText = `Question ${questionCounter}/ ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    // This gives a random number between 0 and the number of questions
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);

    // Here we asign a random question to the variable
    currentQuestion = availableQuestions[questionIndex];

    // Here we show the random question in the UI
    question.innerText = currentQuestion.question; // currentQuestion is an object with the question attribute

    // Display the choices of each questions respectively 
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion[`choice${number}`];
    });

    // we get rid of the already answered questions
    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

}

// selecting the questions
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = Number(selectedChoice.dataset['number']);
        const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';
        // Here we add the class to the box, if the answer is correct or incorrect
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);

            if (classToApply === 'correct') {
                incrementScore(CORRECT_BONUS);
            }
            getNewQuestion();
        }, 1000)
        

    });
});

const incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}
