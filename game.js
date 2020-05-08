const question = document.getElementById('question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        //When there is no more questions we go to the end page and we store the score in localStorage
        localStorage.setItem('mostRecentScore', score);
        
        return window.location.assign('/end.html');
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
startGame();