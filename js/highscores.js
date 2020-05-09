const highScoresList = document.getElementById('high-scores-list');

const highScores = localStorage.getItem('highScores') ? JSON.parse(localStorage.getItem("highScores")) : [];

highScoresList.innerHTML =  highScores.map(score => {
    return `<li class="high-score">${score.name} <span class="high-score-marker">${score.score}</span></li>`
})
.join('');