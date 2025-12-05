import { findWeatherForCity } from './API.js';

const DEFAULT_CITY = 'Seattle';

const state = {
  temp: 72,
  tempDisplay: null,
  increaseTempButton: null,
  decreaseTempButton: null,
  landscape: null,
  skyDropdown: null,
  skySection: null,
  cityNameInput: null,
  cityNameDisplay: null,
  weatherButton: null,
  cityResetButton: null
};

// ------------wave 2------------
const TEMP_STYLES = {
  80: {
    class: 'red',
    landscape: '🌵🐍🦂🌵🐍🦂🌵🐍🦂🌵🐍🦂🌵🐍🦂🌵🐍🦂'
  },
  70: {
    class: 'orange',
    landscape: '🌼🌻🌱🌼🌻🌱🌼🌻🌱🌼🌻🌱🌼🌻🌱🌼🌻🌱'
  },
  60: {
    class: 'yellow',
    landscape: '🌾🍂🐿️🌾🍂🐿️🌾🍂🐿️🌾🍂🐿️🌾🍂🐿️🌾🍂🐿️'
  },
  50: {
    class: 'green',
    landscape: '🌲🌳🍃🌲🌳🍃🌲🌳🍃🌲🌳🍃🌲🌳🍃🌲🌳🍃'
  },
  40: {
    class: 'teal',
    landscape: '⛄️❄️⛷️⛄️❄️⛷️⛄️❄️⛷️⛄️❄️⛷️⛄️❄️⛷️⛄️❄️⛷️'
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
  action === 'up' ? state.temp++ : state.temp--;
  updateTempUI(state.temp);
};

// ------------wave 3------------
const updateCityName = (city) => {
  state.cityNameDisplay.textContent = city;
};

// ------------wave 4------------
// Update temperature when button is clicked
const fetchWeather = () => {
  const cityName = state.cityNameInput.value;
  findWeatherForCity(cityName).then((temps) => {
    state.temp = Math.ceil(temps.fahrenheitTemp);
    updateTempUI(state.temp);
    return;
  }).catch((err) => {
    console.error('Failed to fetch', err);
  });
};

const resetCityAndTemp = () => {
  state.cityNameInput.value = DEFAULT_CITY;
  state.cityNameDisplay.textContent = DEFAULT_CITY;
  state.temp = 72;
  updateTempUI(state.temp);
};

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

const registerEvents = () => {
  state.increaseTempButton.addEventListener('click', () => changeTemp('up'));
  state.decreaseTempButton.addEventListener('click', () => changeTemp('down'));
  state.cityNameInput.addEventListener('input', (event) => updateCityName(event.target.value));
  state.skyDropdown.addEventListener('change', () => changeSky(state.skyDropdown.value));
  state.weatherButton.addEventListener('click', fetchWeather);
  state.cityResetButton.addEventListener('click', resetCityAndTemp);
};

const loadControls = () => {
  state.tempDisplay = document.querySelector('#tempValue');
  state.increaseTempButton = document.querySelector('#increaseTempControl');
  state.decreaseTempButton = document.querySelector('#decreaseTempControl');
  state.landscape = document.querySelector('#landscape');
  state.skyDropdown = document.querySelector('#skySelect');
  state.skySection = document.querySelector('#sky');
  state.cityNameInput = document.querySelector('#cityNameInput');
  state.cityNameDisplay = document.querySelector('#headerCityName');
  state.weatherButton = document.querySelector('#checkWeather');
  state.cityResetButton = document.querySelector('#cityNameReset');
};

const onLoaded = () => {
  loadControls();
  registerEvents();
  updateTempUI(state.temp);
  updateCityName(DEFAULT_CITY);
};

onLoaded();