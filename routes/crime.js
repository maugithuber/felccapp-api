'use strict'

var express = require('express');
var CrimeController = require('../controllers/crime');
var api = express.Router();


api.get('/', function(req,res){
    return res.status(200).send({message: 'Welcome to FELCCAPP API'});
});


api.get('/get-crimes' ,CrimeController.getCrimes);


module.exports = api;

