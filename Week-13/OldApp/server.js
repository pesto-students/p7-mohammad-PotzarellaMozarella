const express = require('express')
const request = require('request')

//defining environment
const port = process.env.port || 9000;

const app = express()

//api key for weather app
const apiKey = "8f00333360466133fd01c705cb4c5b35"

//middleware for pagination
function paginatedResults(model) {
	console.log(model)
	return (req, res, next) => {
		let page = parseInt(req.query.page)
		let limit = parseInt(req.query.limit)
		let startIndex = (page - 1) * limit
		let endIndex = (page) * limit
		let results = {}
		if (endIndex < model.length) {
			results.next = {
				page: page + 1,
				limit: limit
			}
		}
		if (startIndex > 0) {
			results.prev = {
				page: page - 1,
				limit: limit
			}
		}
		results.results = model.slice(startIndex, endIndex)
		res.paginatedResults = results
		next()
	}
}

//importing JSON containing city list
const citiesDetails = require('./citiesDetails.json');

var citiesWeather = [];

//for weather page to render all cities weather
app.get('/weather', paginatedResults(citiesWeather), (req, res) => {
	var request = require('request')
	// console.log(citiesDetails.length)
	for (let i = 0; i < citiesDetails.length; i++) {
		let lon = citiesDetails[i].coord.lon
		// console.log(lon);
		let lat = citiesDetails[i].coord.lat
		// console.log(lat);
		request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
			function (error, response, body)  {
				try {
					const obj = JSON.parse(body);
					if (response.statusCode === 200) {
						citiesWeather.push({
							cityName: obj.name,
							lon: obj.coord.lon,
							lat: obj.coord.lat,
							weather: obj.weather[0].description,
							weatherDetails: obj.main,
						})
					}
					
				} 
				catch (error) {
					// The line below run only if an error happened.
					console.log('Message: ', error.message);
				}
				// console.log(citiesWeather)
				return citiesWeather;
			}
		)		
	}
	res.json(citiesWeather) //this prints the list of cities with weather correctly
	res.json(res.paginatedResults) //this isnt working right now
})



//to fetch the current weather for a specific latitude and longitude 
app.get('/weather/:lon/:lat', (req, res) => {
	let lon = req.params.lon
	let lat = req.params.lat
	var request = require('request')
	request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
		function (error, response, body) {
			console.log(body)
			let data = JSON.parse(body)
			console.log(data)
			if (response.statusCode === 200) {
				console.log(data)
				res.send(`The weather in your city : ${data.weather[0].description} with temp: ${data.main.temp} deg celsius, humidity: ${data.main.humidity}%.`);
			}
			else console.log(error)
		}
	);
});


//to fetch the current weather for a specific city
app.get('/weather/:city', (req, res) => {
	let city = req.params.city
	var request = require('request')
	request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
		function (error, response, body) {
			let data = JSON.parse(body)
			if (response.statusCode === 200) {
				res.send(`The weather in your city ${city}: ${data.weather[0].description} with temp: ${data.main.temp} deg celsius, humidity: ${data.main.humidity}%.`);
			}
			else console.log(error)
		}
	);
});

//to fetch the current weather for a specific city code and country code
app.get('/weather/:cityCode/:countryCode', (req, res) => {
	let cityCode = req.params.cityCode;
	let countryCode = req.params.countryCode;
	request(`https://api.openweathermap.org/data/2.5/weather?zip=${cityCode},${countryCode}&appid=${apiKey}&units=imperial`,
		function (error, response, body) {
			let data = JSON.parse(body);
			countryCode = countryCode.toUpperCase()
			if (response.statusCode === 200) {
				res.send(`The weather in City code: ${cityCode}, which is '${data.name}' in the Country: ${countryCode}: ${data.weather[0].description} with Temp: ${data.main.temp} deg celsius, Humidity: ${data.main.humidity}%.`);
			}
			else console.log(error)
		}
	);
});
app.listen(port, () => console.log(`Server started on port ${port}`));

























