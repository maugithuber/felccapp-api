'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();    



var user_routes = require('./routes/user');
var alert_routes = require('./routes/alert');
var crime_routes = require('./routes/crime');

//cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

//middelwares:
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// rutas
app.use(user_routes);
app.use(alert_routes);
app.use(crime_routes);

module.exports = app;