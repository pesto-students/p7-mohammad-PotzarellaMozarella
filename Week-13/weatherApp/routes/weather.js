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
                console.log(data)
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


module.exports = router;