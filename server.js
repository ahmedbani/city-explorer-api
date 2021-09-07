'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

class Forecast {
    constructor(date,description){
        this.date = date;
        this.description = `low of ${description.low_temp}, high of ${description.high_temp} with ${description.weather.description}`;
    }
    
}
//http://localhost:4000/weather?lat=47.6038321&lon=-122.3300624/
server.get('/weather',(req,res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const result = weatherData.find(item => {
        if(item.lat === latitude && item.lon === longitude)
        return item.data;
        else
        return 'ERROR, no city data';
    })
    let objArr = result.data.map(item => {
        let newObject = new Forecast(item.datetime,item)
        return newObject;
    });
    res.send(objArr);
})

//http://localhost:4000/**** */
server.get('*',(req,res) => {
    res.status(404).send('sorry, page not found');
})

server.listen(PORT,() => {
    console.log(`Hi, listening from PORT: ${PORT}`)
})

