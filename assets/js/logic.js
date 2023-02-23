
// Get elements

const questionsEl = document.querySelector("#questions");
const choicesEl = document.querySelector("#choices");
const startBtn = document.querySelector("#start");
const timerEl = document.querySelector("#timer");
const feedbackEl = document.querySelector("#feedback");
const nameEl = document.querySelector("#name");
const submitBtn = document.querySelector("#submit");


//question

const quizquestions = [
  {
      prompt: "Who is the best player in the world?",
      options: ["Messi", "Christiano", "Neymar", "Mbappe"],
      answer: "Messi"
  },

  {
      prompt: "The Scudetto is the name given to the league title in which European country?",
      options: ["Italy", "Belgium", "Germany", "France"],
      answer: "Italy"
  },

  {
      prompt: "How many teams originally competed in the Premier League?",
      options: ["10", "20", "30", "40"],
      answer: "40"
  },

  {
      prompt: "In what year was the Women’s Football Association established in England?",
      options: ["1966", "1967", "1968", "1969"],
      answer: "1969" 
  },

  {
      prompt: "As of 2022, how many Ballon d’Or awards has Lionel Messi won?",
      options: ["5", "6", "7", "8"],
      answer: "7"
  }];

// first step is time

var currentQuestionIndex = 0;
var time = quizquestions.length * 15,timerId ;

//  quiz 

function quizStart() {
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  document.getElementById("start-screen").classList.add("hide");
  document.getElementById("questions").classList.remove("hide");
  getQuestion();
}


// lose time if answered wrong and next question

function questionClick() {
  var isCorrect = this.value === quizquestions[currentQuestionIndex].answer;
  time -= isCorrect ? 0 : 10;
  timerEl.textContent = time;
  feedbackEl.textContent = isCorrect ? "Correct!" : `Wrong! The correct answer was ${quizquestions[currentQuestionIndex].answer}.`;
  feedbackEl.style.color = isCorrect ? "green" : "red";
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 2000);
  currentQuestionIndex++;
  if (currentQuestionIndex === quizquestions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


//  create list 

function getQuestion() {
  var currentQuestion = quizquestions[currentQuestionIndex];
var promptEl = document.getElementById("question-title")
  promptEl.textContent = currentQuestion.prompt;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function(choice, i) {
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("value", choice);
      choiceBtn.textContent = i + 1 + ". " + choice;
      choiceBtn.onclick = questionClick;
      choicesEl.appendChild(choiceBtn);
  });
}

// End quiz end and show the final score

function quizEnd() {
    clearInterval(timerId);
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}


//  Timer reaches 0 when quiz end

function clockTick() {
  timerEl.textContent = --time || quizEnd();
}


function saveHighscore() {
  var name = nameEl.value.trim();
  if (name) {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    highscores.push({ score: time, name: name });
    localStorage.setItem("highscores", JSON.stringify(highscores));
  }
}
// Start quiz 

startBtn.addEventListener("click", quizStart);

// Save users' score after pressing enter

nameEl.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
});

// save initials

submitBtn.addEventListener("click", saveHighscore);




