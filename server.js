"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const server = express();
server.use(cors());

const PORT = process.env.PORT;

class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
  }
}
//http://localhost:4000/weather?lat=47.6038321&lon=-122.3300624/
server.get("/weather", getWeatherData);

function getWeatherData(req, res) {
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
}
//http://localhost:4000/movies?api_key=
server.get('/movies',getMoviesData);

function getMoviesData(req,res){
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_KEY}`

    axios
    .get(url)
    .then(result => {
        console.log(result);
        let movies = result.data.results.map(item => new Movie(item));
        res.send(movies);
    })
    .catch((err) => res.status(404).send("sorry, page not found"));
}

//http://localhost:4000/**** */
server.get("*", (req, res) => {
  res.status(404).send("sorry, page not found");
});

function Movie (item){
    this.title= item.title ;
    this.overview= item.overview ;
    this.average_votes= item.vote_average;
    this.total_votes= item.vote_count;
    this.image_url= item.poster_path;
    this.popularity= item.popularity;
    this.released_on= item.release_date;
}

server.listen(PORT, () => {
  console.log(`Hi, listening from PORT: ${PORT}`);
});
