//highscores

var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
highscores.sort((a, b) => b.score - a.score);

var olEl = document.getElementById("highscores");
highscores.forEach(score => {
  var liTag = document.createElement("li");
  liTag.textContent = `${score.name} - ${score.score}`;
  olEl.appendChild(liTag);
});

document.getElementById("clear").onclick = () => {
  localStorage.removeItem("highscores");
  location.reload();
};


