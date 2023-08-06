'use strict';
// const score0 = document.getElementById('afsfa'); faster than query Selector

//selecting all req elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const CurrScore1El = document.querySelector('#current--0');
const CurrScore2El = document.querySelector('#current--1');

//Start Conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

let currScore, activePlayer, scores, playing; // state variable for stopping the game after one wins;

const init = function () {
  currScore = 0;
  activePlayer = 1;
  playing = true;
  scores = [0, 0];
  score1El.textContent = 0;
  score2El.textContent = 0;
  CurrScore1El.textContent = 0;
  CurrScore2El.textContent = 0;

  diceEl.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};
init();

const reset = function () {
  currScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  activePlayer = activePlayer === 1 ? 0 : 1;
  // can use toggle
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.remove('player--active');
  // activePlayer = activePlayer === 0 ? 1 : 0;
  // document
  //   .querySelector(`.player--${activePlayer}`)
  //   .classList.add('player--active');
};

btnRoll.addEventListener('click', function () {
  if (!playing) return;
  const value = Math.trunc(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${value}.png`;
  if (value === 1) reset();
  else {
    currScore += value;
    document.querySelector(`#current--${activePlayer}`).textContent = currScore;
    // if (player === 1) CurrScore1El.textContent = currScore;
    // else CurrScore2El.textContent = currScore;
    // In order to minimise above select the element dynamically
    // Store the Scores in an array.
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;
  scores[activePlayer] += currScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];
  // if (activePlayer === 1) {
  //   score1El.textContent = scores[0];
  // } else {
  //   scores[1] += currScore;
  //   score2El.textContent = scores[1];
  // }
  if (scores[activePlayer] >= 20) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else reset();
});

// Instead of this use an init function
// btnNew.addEventListener('click', function () {
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner');
//   reset();
//   activePlayer = 1;
//   scores[0] = 0;
//   scores[1] = 0;
//   score1El.textContent = 0;
//   score2El.textContent = 0;
// });

btnNew.addEventListener('click', init);
