'use strict'
var connection = require('./services/database');
var app = require('./app');   //para usar express desde el fichero app.js


var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3800, function () {
    console.log("inicio del servidor node en el puerto 3800");
  });
  
  io.on('connection',function (socket) {
    console.log("alguien se conecto");






    socket.on('registerAlert',function(data){
      console.log(data.category);
      console.log(data.lat);
      console.log(data.lng);
      console.log(data.description);
      var sql= `
      SELECT citizens.id 
      FROM citizens,users 
      WHERE users.id=citizens.id_user and users.email = '${data.email}'`;
      connection.query(sql, (error, result) =>{
  
      if(error){
        console.log('error:'+error.sqlMessage);
        return;
      } 
        var id_citizen = result[0].id;
        console.log('citizen: '+id_citizen);
        sql = `
        INSERT INTO alerts 
        VALUES(null,
          (SELECT DATE(NOW())) ,
          (SELECT TIME(NOW())) ,
          '${data.lng}',
          '${data.lat}',
          '${data.description}',
          '${data.photo}',
          'pendiente',
          '${id_citizen}',
          '${data.category}'
        )`;
        connection.query(sql, (error, result) => {
          if(error){
            console.log('error:'+error.sqlMessage);
            return;
          } 
            io.emit(`Alert`,data);
            console.log('registrada')
        });
      });

    });


    
    socket.on('registerCrime',function(data){
      console.log(data);
    });




    
});


  