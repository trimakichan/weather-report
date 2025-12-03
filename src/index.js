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

