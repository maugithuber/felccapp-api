'use strict'

var express = require('express');
var AlertController = require('../controllers/alert');
var api = express.Router();



api.get('/get-alerts' ,AlertController.getAlerts);






module.exports = api;
