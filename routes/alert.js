'use strict'

var express = require('express');
var AlertController = require('../controllers/alert');
var api = express.Router();



api.get('/get-alerts' ,AlertController.getAlerts);
api.get('/get-image-alert/:alertId', AlertController.getImageAlert);

api.get('/get-robo' ,AlertController.getRobo);
api.get('/get-violacion' ,AlertController.getViolacion);
api.get('/get-violencia' ,AlertController.getViolencia);
api.get('/get-stats' ,AlertController.getStats);




module.exports = api;
