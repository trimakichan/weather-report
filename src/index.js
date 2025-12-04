'use strict';

// ------------wave 2------------
let temp = 72;

const state = {
  tempDisplay: null,
  increaseTempButton: null,
  decreaseTempButton: null,
  landscape: null,
};

const TEMP_STYLES = {
  80: {
    class: 'red',
    landscape: '🌵🐍🦂'
  },
  70: {
    class: 'orange',
    landscape: '🌼🌻🌱'
  },
  60: {
    class: 'yellow',
    landscape: '🌾🍂🐿️'
  },
  50: {
    class: 'green',
    landscape: '🌲🌳🍃'
  },
  40: {
    class: 'teal',
    landscape: '⛄️❄️⛷️'
  }
};

const displayTemp = (temp) => {
  state.tempDisplay.textContent = `${temp} F`;
};

const applyTempStyles = (temp) => {
  let flooredTemp = Math.floor(temp / 10) * 10;

  if (flooredTemp < 40) flooredTemp = 40;
  if (flooredTemp > 90) flooredTemp = 80;

  const style = TEMP_STYLES[flooredTemp];

  state.tempDisplay.className = style.class;
  state.landscape.textContent = style.landscape;
};

const updateTempUI = (temp) => {
  displayTemp(temp);
  applyTempStyles(temp);
};

const changeTemp = (action) => {
  action === 'up' ? temp++ : temp--;
  updateTempUI(temp);
};

const registerEvents = () => {
  state.increaseTempButton.addEventListener('click', () => changeTemp('up'));
  state.decreaseTempButton.addEventListener('click', () => changeTemp('down'));
};

const loadControls = () => {
  state.tempDisplay = document.querySelector('#tempValue');
  state.increaseTempButton = document.querySelector('#increaseTempControl');
  state.decreaseTempButton = document.querySelector('#decreaseTempControl');
  state.landscape = document.querySelector('#sky');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTempUI(temp);
};

onLoaded();

