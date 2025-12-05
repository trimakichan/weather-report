const proxyServer = 'https://ada-weather-report-proxy-server.onrender.com';

const findLatitudeAndLongitude = (query) => {
  let latitude, longitude;
  return axios.get(`${proxyServer}/location?q=${query}`)
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;

      return { latitude, longitude };
    })
    .catch((error) => {
      console.log('error in findLatitudeAndLongitude!', error);
    });
};

const findCurrentWeather = (latitude, longitude) => {
  return axios.get(`${proxyServer}/weather?lat=${latitude}&lon=${longitude}`)
    .then((response) => {
      const kelvinTemp = response.data.main.temp;
      const fahrenheitTemp = (kelvinTemp - 273.15) * (9 / 5) + 32;
      const celsiusTemp = kelvinTemp - 273.15;
      return { fahrenheitTemp, celsiusTemp };
    })
    .catch((error) => {
      console.log('error in findCurrentWeather!', error);
    });
};

export const findWeatherForCity = (cityName) => {
  return findLatitudeAndLongitude(cityName).then(({ latitude, longitude }) => {
    return findCurrentWeather(latitude, longitude);
  });
};