'use strict';

// ------------wave 2------------
let temp = 72;

const state = {
  tempDisplay: null,
  increaseTempButton: null,
  decreaseTempButton: null,
  landscape: null,
  skyDropdown: null,
  skySection: null
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
  if (flooredTemp > 80) flooredTemp = 80;

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
// ------------------------------

// ------------wave 5------------
const SKY_ICONS = {
  sunny: 'assets/sunny.svg',
  cloudy: 'assets/cloudy.svg',
  rainy: 'assets/rain.svg',
  snowy: 'assets/snow.svg'
};

const changeSky = (sky) => {
  state.skySection.src = SKY_ICONS[sky];
};
// ------------------------------

const registerEvents = () => {
  state.increaseTempButton.addEventListener('click', () => changeTemp('up'));
  state.decreaseTempButton.addEventListener('click', () => changeTemp('down'));
  state.skyDropdown.addEventListener('change', () => changeSky(state.skyDropdown.value));

  // ------------wave 3------------
  document.querySelector('#cityNameInput').addEventListener('input', (event) => {
    const cityName = event.target.value;
    document.querySelector('#headerCityName').textContent = cityName;
  });

  // ------------wave 4------------
  // Update temperature when button is clicked
  document.querySelector('#checkWeather').addEventListener('click', () => {
    const cityName = document.querySelector('#cityNameInput').value;
    findWeatherForCity(cityName).then((temps) => {
      temp = Math.ceil(temps.fahrenheitTemp);
      updateTempUI(temp);
    });
  });

  // Reset city name when reset button is clicked
  document.querySelector('#cityNameReset').addEventListener('click', () => {
    document.querySelector('#cityNameInput').value = '';
    document.querySelector('#headerCityName').textContent = '';
  });
};

const loadControls = () => {
  state.tempDisplay = document.querySelector('#tempValue');
  state.increaseTempButton = document.querySelector('#increaseTempControl');
  state.decreaseTempButton = document.querySelector('#decreaseTempControl');
  state.landscape = document.querySelector('#landscape');
  state.skyDropdown = document.querySelector('#skySelect');
  state.skySection = document.querySelector('#sky');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTempUI(temp);
};

onLoaded();

