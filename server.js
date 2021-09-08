"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const weather = require('./weather');
const movies = require('./movies');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

//http://localhost:4000/weather?lat=47.6038321&lon=-122.3300624/
server.get("/weather", weather.getWeatherData);

//http://localhost:4000/movies?cityname=
server.get('/movies',movies.getMoviesData);

//http://localhost:4000/**** */
server.get("*", (req, res) => {
  res.status(404).send("sorry, page not found");
});

server.listen(PORT, () => {
  console.log(`Hi, listening from PORT: ${PORT}`);
});
