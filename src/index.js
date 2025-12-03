// wave 2
'use strict';

let temp = 72;

const state = {
  tempDisplay: null,
  increaseTempButton: null,
  decreaseTempButton: null,
};

const displayTemp = () => {
  state.tempDisplay.textContent = temp;
  state.tempDisplay.classList.remove('red', 'teal', 'green', 'yellow', 'orange');

  // refactor this later.
  if (temp >= 80) {
    state.tempDisplay.classList.add('red');
  } else if (temp < 50) {
    state.tempDisplay.classList.add('teal');
  } else if (temp < 60) {
    state.tempDisplay.classList.add('green');
  } else if (temp < 70) {
    state.tempDisplay.classList.add('yellow');
  } else {
    state.tempDisplay.classList.add('orange');
  }
};

const changeTemp = (action) => {
  action === 'up' ? temp++ : temp--;
  displayTemp();
};

const registerEvents = () => {
  state.increaseTempButton.addEventListener('click', () => changeTemp('up'));
  state.decreaseTempButton.addEventListener('click', () => changeTemp('down'));
};

const loadControls = () => {
  state.tempDisplay = document.querySelector('#tempValue');
  state.increaseTempButton = document.querySelector('#increaseTempControl');
  state.decreaseTempButton= document.querySelector('#decreaseTempControl');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  displayTemp();
};

onLoaded();

