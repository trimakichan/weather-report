// wave 2
'use strict';

const state = {
  tempDisplay: null,
  increaseTempButton: null,
  decreaseTempButton: null,
};


let temp = 72;

const displayTemp = () => {
  state.tempDisplay.textContent = temp;
};

const increaseTemp = () => {
  console.log('up');
  temp++;
  displayTemp();
};

const decreaseTemp = () => {
  console.log('down');
  temp--;
  displayTemp();
};

// const increaseTempControl = () => {
//   const increaseButton = document.querySelector('#increaseTempControl');
//   increaseButton.addEventListener('click', increaseTemp);
// }

const registerEvents = () => {
  state.increaseTempButton.addEventListener('click', increaseTemp);
  state.decreaseTempButton.addEventListener('click', decreaseTemp);
};

const loadControls = () => {
  state.tempDisplay = document.querySelector('#tempValue');
  state.increaseTempButton = document.querySelector('#increaseTempControl');
  state.decreaseTempButton= document.querySelector('#decreaseTempControl');

  console.log(state);
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  displayTemp();
};

onLoaded();

