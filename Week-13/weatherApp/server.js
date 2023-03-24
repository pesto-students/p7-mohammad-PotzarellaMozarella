// Require application dependencies
// These are express, body-parser, and request

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

// Configure dotenv package

require("dotenv").config();
// Set up your OpenWeatherMap API_KEY

const apiKey = `${process.env.API_KEY}` || '256455341c0747b5ba181106232403';

// Setup express app and body-parser configurations
// Setup javascript template view engine
// Static pageswill be served from the public directory, it will act as your root directory
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Setup your default display on launch
app.get("/", function (req, res) {
    // It will not fetch and display any data in the index page
    res.render("index", { cityWeather: null, error: null });
});

app.post('/', (req, res) => {
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

            // you will set up your port configurations. You will also start the server and add a message to display when running.
            app.listen(5000, function () {
                console.log("Weather app listening on port 5000!");
            })