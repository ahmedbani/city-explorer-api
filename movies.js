'use strict';

const axios = require("axios");
const obj = {};

class Movie {
    constructor(item){
      this.title= item.title ;
      this.overview= item.overview ;
      this.average_votes= item.vote_average;
      this.total_votes= item.vote_count;
      this.image_url= item.poster_path;
      this.popularity= item.popularity;
      this.released_on= item.release_date;
  }
}
let memory ={};
//https://api.themoviedb.org/3/search/movie?query=cityname&key
obj.getMoviesData = function (req,res){
    const city = req.query.query;

    if(memory[city !== undefined]){
        res.send(memory[city]);
    }else{
    const url = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.MOVIE_KEY}`;

    axios
    .get(url)
    .then(result => {
        let movies = result.data.results.map(item => new Movie(item));
        memory[city] = movies;
        res.send(movies);
    })
    .catch((err) => res.status(404).send("sorry, page not found"));
}
}
module.exports = obj ;