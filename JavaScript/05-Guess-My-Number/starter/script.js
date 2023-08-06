'use strict';
// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🥳 Correct Number';
// //value property
// document.querySelector('.guess').value = 21;

// data imp to application is called state of the application like secret number and score in this case.

// game logic/

let secretNum = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0; // Handler function
document.querySelector('.check').addEventListener('click', function () {
  const inputNum = Number(document.querySelector('.guess').value);
  if (score < 1) return;
  if (!inputNum) {
    printmsg('❌ No Input');
  } else if (inputNum == secretNum) {
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    printmsg('Correct No');
    document.querySelector('.number').textContent = secretNum;
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (inputNum < secretNum) {
    score--;
    printmsg('Too Low');
  } else if (inputNum > secretNum) {
    score--;
    printmsg('Too High');
  }
  document.querySelector('.score').textContent = score;
  if (score == 0) printmsg('You Lost the game');
});

// Again
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.message').textContent = 'Start Guessing';
  document.querySelector('.number').textContent = '?';
  secretNum = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.guess').value = '';
});

function printmsg(message) {
  document.querySelector('.message').textContent = message;
}
