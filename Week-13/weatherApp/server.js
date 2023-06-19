// Require application dependencies
// These are express, body-parser, and request

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


// Configure dotenv package

require("dotenv").config();
// Set up your OpenWeatherMap API_KEY

//setting up the port for hosting server with fallback default value
const port = process.env.port || 4000;
const apiKey = `${process.env.API_KEY}` || '256455341c0747b5ba181106232403';

//setup express app and body-parser configurations
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//static pages will be served from the public directory, it will act as root directory
app.use(express.static("public"));


//setup javascript template view engine
app.set("view engine", "ejs");

//importing weather routes
const weatherRouter = require('./routes/weather')

//to connect weather routes with main route
app.use('/', weatherRouter)


//start the server and add a message to display when running
app.listen(port, () => console.log(`Server started on port ${port}`));