const proxyServer = 'http://127.0.0.1:5000';

const findLatitudeAndLongitude = (query) => {
    let latitude, longitude;
    // Return the promise chain created by the axios call
    return axios.get(`${proxyServer}/location?q=${query}`)
        .then((response) => {
            latitude = response.data[0].lat;
            longitude = response.data[0].lon;
            // console.log('success in findLatitudeAndLongitude!', latitude, longitude);

            return { latitude, longitude }; // Return the data we want to pass on
        })
        .catch((error) => {
            console.log('error in findLatitudeAndLongitude!', error);
            // console.log(error); // If we want to see more info about the issue
        });
};

const findCurrentWeather = (latitude, longitude) => {
    return axios.get(`${proxyServer}/weather?lat=${latitude}&lon=${longitude}`)
        .then((response) => {
            // converting Kelvin into Fahrenheit is: F = (K - 273.15) * (9 / 5) + 32
            const kelvinTemp = response.data.main.temp;
            const fahrenheitTemp = (kelvinTemp - 273.15) * (9 / 5) + 32;
            const celsiusTemp = kelvinTemp - 273.15;
            return { fahrenheitTemp, celsiusTemp }; // Return both temperatures
        })
        .catch((error) => {
            console.log('error in findCurrentWeather!', error);
            // console.log(error); // If we want to see more info about the issue
        });
};

const findWeatherForCity = (cityName) => {
    return findLatitudeAndLongitude(cityName).then(({ latitude, longitude }) => {
        return findCurrentWeather(latitude, longitude);
    });
};