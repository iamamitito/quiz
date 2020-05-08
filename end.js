const saveScoreBtn = document.getElementById('save-score-btn');
const username = document.getElementById('username');
const finalScore = document.getElementById('final-score');

// Here we access local storage set in game.js
const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveScoreBtn.addEventListener('click', (e) => {
    console.log('clicked the save button!');
    e.preventDefault();
});
