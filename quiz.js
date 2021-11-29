// pos is position of where the user in the test or which question they're up to
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
// this is a multidimensional array with 4 inner array elements with 5 elements inside them
var questions = [
  {
    question: "What does CSS stand for?",
    choices: [
      {text: 'Creative Style Sheet', correct: false},
      {text: 'Colorful Style Sheet', correct: false},
      {text: 'Computer Style Sheet', correct: false},
      {text: 'Cascading Style Sheet', correct: true}
    ],
  }, 
  {
    question: "Where in an HTML document is the correct place to refer to an external style sheet?",
    choices: [
      {text: 'In the <head> section', correct: true},
      {text: 'In the <body> section', correct: false},
      {text: 'At the end of the document', correct: false}
    ],
  }, 
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    choices: [
      {text: '<style>', correct: true},
      {text: '<script>', correct: false},
      {text: '<css>', correct: false}
    ],
  }, 
  {
    question: "What does HTML stand for?",
    choices: [
      {text: 'Home Tool Markup Language', correct: false},
      {text: 'Hyperlinks and Text Markup Language', correct: false},
      {text: 'Hyper Text Markup Language', correct: true}
    ],
  }, 
  {
    question: "Which character is used to indicate an end tag?",
    choices: [
      {text: '^', correct: false},
      {text: '/', correct: true},
      {text: '*', correct: false},
      {text: '<', correct: false}
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: [
      {text: '<javascript>', correct: false},
      {text: '<js>', correct: false},
      {text: '<script>', correct: true},
      {text: '<scripting>', correct: false}
    ],
  }, 
  {
    question: "How to write an IF statement in JavaScript?",
    choices: [
      {text: 'if i =5 then', correct: false},
      {text: 'if (i == 5)', correct: true},
      {text: 'if i = 5', correct: false},
      {text: 'if i ==5 then', correct: false}
    ],
  }
    
    
    
];
var startBtn = document.getElementById('startBtn');
var submitBtn = document.getElementById('submitBtn');
var goBackBtn = document.getElementById('goBackBtn');
var clearBtn = document.getElementById('clearBtn');
var textBox = document.getElementById('textBox');
var questionBox = document.getElementById('questionBox');
var ansBtn = document.getElementById('ansBtn');
var ansCorrect = document.getElementById('correct');
var ansWrong = document.getElementById('wrong');
var submitFormEl = document.getElementById('submitForm');
var scoreEl = document.getElementById('scoreInfo');
var highScoreEl = document.getElementById('highScore');
var timeEl = document.getElementById('timerCount');
var initials = document.getElementById('initials');
var scoreList = document.getElementById('scoreList');
var currentQuestion;
var secondsLeft = 60;
var timerInterval;

startBtn.addEventListener("click", startQuiz)

//Start the quiz function
function startQuiz() {
  startBtn.classList.add('hide');
  textBox.classList.add('hide');
  questionBox.classList.remove('hide');
  ansBtn.classList.remove('hide');
  currentQuestion = 0;
  setTime();
  nextQuestion();
}


//Calls for next question
function nextQuestion() {
  showQues(quizQuestions[currentQuestion]);
  currentQuestion++;
}

function showQues(quiz){
  questionBox.innerText = quiz.question;
  for(var i = 0; i < quiz.choices.length; i++) {
    var button = document.createElement('button');
    button.innerText = quiz.choices[i].text;
    button.classList.add('button');
    if(quiz.choices[i].correct) {
      button.dataset.correct = quiz.choices[i].correct;
      console.log(button.dataset.correct);
    }
    button.addEventListener('click', userChoice)
    ansBtn.appendChild(button);
  };
}

function userChoice(event){
  var selectBtn = event.target;
  ansCorrect.classList.add('hide');
  ansWrong.classList.add('hide');
  var selectAns = selectBtn.dataset.correct;
  if (selectAns) {
    ansCorrect.classList.remove('hide');
    while (ansBtn.firstChild) {
      ansBtn.removeChild(ansBtn.firstChild);
    }
  } else {
    ansWrong.classList.remove('hide');
    secondsLeft = secondsLeft - 10;
    while (ansBtn.firstChild) {
      ansBtn.removeChild(ansBtn.firstChild);
    }
  }
  if (quizQuestions.length > currentQuestion){
    nextQuestion();
  } else {
    clearInterval(timerInterval);
    openSubmitForm();
  }
}


function openSubmitForm() {
  questionBox.classList.add('hide');
  ansBtn.classList.add('hide');
  startBtn.classList.add('hide');
  textBox.classList.add('hide');
  submitFormEl.classList.remove('hide');
  document.querySelector(".scoreInfo").textContent = 'Your Final Score is ' + secondsLeft;
  
}

function clearEl() {
  ansWrong.classList.add('hide');
  ansCorrect.classList.add('hide');
  
}

submitBtn.addEventListener('click', function (event) {
  event.preventDefault();
  highScoreEl.classList.remove('hide');
  submitFormEl.classList.add('hide');
  var user = {
    initialsName: initials.value.trim(),
    score: secondsLeft
  };
  initials.value='';
  localStorage.setItem("score", JSON.stringify(user));
  var scoreEl = JSON.parse(localStorage.getItem("score"));
  if (scoreEl !== null) {
    var winner = document.createElement('li');
    winner.innerText = scoreEl.initialsName + " - " + scoreEl.score;
    scoreList.appendChild(winner);
  }

})

goBackBtn.addEventListener("click", function(){
  startBtn.classList.remove('hide');
  textBox.classList.remove('hide');
  highScoreEl.classList.add('hide');
  clearInterval(timerInterval);
  secondsLeft = 60;
  timeEl.textContent = secondsLeft;
  // submitFormEl.removeChild(submitFormEl.lastElementChild);

});

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      openSubmitForm();
    }
  }, 1000);
}

clearBtn.addEventListener("click", function(){
  while (scoreList.childElementCount > 0) {
    scoreList.removeChild(scoreList.lastChild);
  }
});

function viewScoreBtn(){
  highScoreEl.classList.remove('hide');
  startBtn.classList.add('hide');
  textBox.classList.add('hide');
  submitFormEl.classList.add('hide');
  questionBox.classList.add('hide');
  ansBtn.classList.add('hide');
}