const saveScoreBtn = document.getElementById('save-score-btn');
const username = document.getElementById('username');
const finalScore = document.getElementById('final-score');

// Here we access local storage set in game.js
const mostRecentScore = localStorage.getItem('mostRecentScore');


// if item is empty, it's just and empty array
const highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem("highScores")) : [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

// here is the function that saves the score
saveScoreBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
    console.log(highScores);

});
