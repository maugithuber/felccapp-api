'use strict'

var app = require('./app');   //para usar express desde el fichero app.js


var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3800, function () {
    console.log("inicio del servidor node en el puerto 3800");
  });
  
  io.on('connection',function (socket) {
    console.log("alguien se conecto");


    socket.on('servidor',function(data){
      console.log(data)
      io.emit(`policeman`,data);
    });
});


  