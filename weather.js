'use strict';

const axios = require("axios");
const obj = {};

class Forecast {
    constructor(item) {
      this.date = item.valid_date;
      this.description = `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
    }
  }

  obj.getWeatherData= function (req, res){
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const url = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_KEY}`;
  
    axios
      .get(url)
      .then((result) => {
        let weatherData = result.data.data.map((item) => new Forecast(item));
        res.send(weatherData);
      })
      .catch((err) => res.status(404).send("sorry, page not found"));
  };

  module.exports = obj ;
