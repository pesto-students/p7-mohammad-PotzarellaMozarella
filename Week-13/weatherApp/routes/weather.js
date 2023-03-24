//importing express library
const express = require('express')

//the router looks exactly like our app and has the 
//same methods- get, put, etc
const router = express.Router()

//api key for weather app
const apiKey = "256455341c0747b5ba181106232403"

//setup default display on launch
router.get("/", function (req, res) {
    // It will not fetch and display any data in the index page
    res.render("index", { cityWeather: null, error: null });
});

router.post('/', (req, res) => {
    let city = req.body.city;
    var request = require('request')
    request(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
        function (error, response, body) {
            if (error) {
                res.render('index', { error: 'Pls try again', cityWeather: null })
            }
            else {
                let data = JSON.parse(body);
                let cityWeather = {
                    name: data.location.name,
                    country: data.location.country,
                    condition: data.current.condition.text,
                    temp: data.current.temp_c,
                    humidity: data.current.humidity
                }
                let headline = "The current weather condition"
                res.render("index", {
                    cityWeather: cityWeather,
                    headline: headline,
                    error: null
                });
            }
        }
    );
})

//setup default display on going to By co-ordinates section
router.get('/coord', function (req, res) {
    // It will not fetch and display any data in the coords page
    res.render('coord', { cityWeather: null, error: null });
});

router.post('/coord', (req, res) => {
    let lon = req.body.lon
    let lat = req.body.lat
    var request = require('request')
    request(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lon},${lat}`,
        function (error, response, body) {
            if (error) {
                res.render('coord', { error: 'Pls try again', cityWeather: null })
            }
            else {
                let data = JSON.parse(body);
                console.log(data)
                let cityWeather = {
                    name: data.location.name,
                    country: data.location.country,
                    condition: data.current.condition.text,
                    temp: data.current.temp_c,
                    humidity: data.current.humidity
                }
                let headline = "The current weather condition"
                res.render("coord", {
                    cityWeather: cityWeather,
                    headline: headline,
                    error: null
                });
            }
        }
    );
})

//to fetch the weather forecast for a specific city for the next X days
router.get('/forecast', function (req, res) {
    // It will not fetch and display any data in the coords page
    res.render('forecast', { forecast: null, error: null });
});

router.get('/forecast', (req, res) => {
    let city = req.body.city
    let days = req.body.days
    var request = require('request')
    request(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days:${days}`,
        function (error, response, body) {
            let forecast = []
            if (error) {
                res.render('forecast', { error: 'Pls try again', forecast: null })
            }
            else {
                let data = JSON.parse(body);
                data.forecast.map(forecastday => {
                    forecast.push({
                        date: forecastday.date,
                        weatherConditon: forecastday.day.condition.text,
                        maxTemp: forecastday.day.maxtemp_c,
                        minTemp: forecastday.day.mintemp_c,
                        humidity: forecastday.day.avghumidity
                    })
                })
                let headline = "The current weather condition"
                res.render("forecast", {
                    forecast: forecast,
                    headline: headline,
                    error: null
                });
            }
        }
    );
});

//Filter the data by any particular city, any particular date , any particular moment
router.get('/:city/:datetime', (req, res) => {
    let city = req.params.city
    let datetime = req.params.datetime
    var request = require('request')
    //to get the current timestaps
    var currTimestamp = new Date().valueOf()
    //to compare and see if the input timestamp is before or after current timestap
    if (currTimestamp < datetime) {
        request(`http://api.weatherapi.com/v1//future.json?key=${apiKey}&q=${city}&unixdt=${datetime}`,
            function (error, response, body) {
                let data = JSON.parse(body)
                if (response.statusCode === 200) {
                    let cityWeather = {
                        name: data.location.name,
                        country: data.location.country,
                        time: datetime,
                        condition: data.current.condition.text,
                        temp: data.current.temp_c,
                        humidity: data.current.humidity
                    }
                    let headline = "The current weather condition at"
                    res.render('pages/forecast/dateTime', {
                        cityWeather: cityWeather,
                        heading: heading
                    });
                }
                else console.log(error)
            }
        )
    }
    else {
        request(`http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${city}&unixdt=${datetime}`,
            function (error, response, body) {
                let data = JSON.parse(body)
                if (response.statusCode === 200) {
                    let cityWeather = {
                        name: data.location.name,
                        country: data.location.country,
                        time: datetime,
                        condition: data.current.condition.text,
                        temp: data.current.temp_c,
                        humidity: data.current.humidity
                    }
                    let headline = "The current weather condition at"
                    res.render('pages/forecast/dateTime', {
                        cityWeather: cityWeather,
                        heading: heading
                    })
                }
                else console.log(error)
            }
        )
    }
});



module.exports = router;