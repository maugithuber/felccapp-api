'use strict'

var app = require('./app');   //para usar express desde el fichero app.js



//socket
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3800, function () {
    console.log("inicio del servidor node en el puerto 3800");
  });
  