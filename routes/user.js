'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var api = express.Router();

// var multipart = require('connect-multiparty');  //middleware para subir archivos
// var md_upload = multipart( {uploadDir: './uploads/users'} );


api.post('/register-policeman/:id_user?',UserController.registerPoliceman);
api.post('/login',UserController.login);

api.get('/get-policemen/:id_user' ,UserController.getPolicemen);
api.put('/edit-policeman/:id_policeman' ,UserController.editPoliceman);
api.delete('/delete-policeman/:id_policeman' ,UserController.deletePoliceman);

// //metodo obtener user, usando el middleware md_auth
// api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
// //users paginados
// api.get('/users/:page?', md_auth.ensureAuth, UserController.getUsers);
// //contadores
// api.get('/counters/:id?',md_auth.ensureAuth,UserController.getCounters);
// //actulizar un user usando metodo PUT
// api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser);
// //actualizar imagen
// api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage);
// //obtener imagen de un user
// api.get('/get-image-user/:imageFile', UserController.getImageFile);

module.exports = api;

