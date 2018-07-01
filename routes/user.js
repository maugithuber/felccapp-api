'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();

// var multipart = require('connect-multiparty');  //middleware para subir archivos
// var md_upload = multipart( {uploadDir: './uploads/users'} );


api.get('/', function(req,res){
    return res.status(200).send({message: 'Welcome to FELCCAPP API'});
});


api.post('/register-policeman/:id_user?',UserController.registerPoliceman);
api.post('/register-citizen',UserController.registerCitizen);
api.post('/login',UserController.login);

api.get('/get-policemen/:id_user' ,UserController.getPolicemen);
api.put('/edit-policeman/:id_policeman' ,UserController.editPoliceman);
api.delete('/delete-policeman/:id_policeman' ,UserController.deletePoliceman);
api.get('/getDistrics',UserController.getDistrics);
api.get('/getIdDistrics/:id',UserController.getIdDistrics);
api.get('/getDistrictsweb',UserController.getDistrictsweb);

module.exports = api;

