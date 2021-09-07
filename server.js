'use strict';

require('dotenv').config();
const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

class Forecast {
    constructor(item){
        this.date = item.valid_date;
        this.description = `low of ${item.low_temp}, high of ${item.high_temp} with ${item.weather.description}`;
    }
    
}
//http://localhost:4000/weather?lat=47.6038321&lon=-122.3300624/
server.get('/weather',(req,res) => {
    const latitude = req.query.lat;
    const longitude = req.query.lon;
    const result = weatherData.find(item => {
        if(item.lat == latitude && item.lon == longitude){
            return item;
        }else{
            console.log('err');
        }
    
    });
    console.log(result);
    let objArr = result.data.map(item => {
        // console.log(item);
        let newObject = new Forecast(item)
        
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

