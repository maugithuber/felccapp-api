'use strict'

var express = require('express');
var AlertController = require('../controllers/alert');
var api = express.Router();



api.get('/get-alerts' ,AlertController.getAlerts);
api.get('/get-image-alert/:alertId', AlertController.getImageAlert);





module.exports = api;
