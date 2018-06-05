'use strict'
var connection = require('./services/database');
var app = require('./app');   //para usar express desde el fichero app.js
// var base64 = require('base-64');
var base64Img = require('base64-img');

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 3800, function () {
    console.log("inicio del servidor node en el puerto 3800");
  });
  
  io.on('connection',function (socket) {
    console.log("alguien se conecto");






    socket.on('registerAlert',function(data){
      // console.log(data.category);
      // console.log(data.lat);
      // console.log(data.lng);
      // console.log(data.description);
      var sql= `
      SELECT citizens.id 
      FROM citizens,users 
      WHERE users.id=citizens.id_user and users.email = '${data.email}'`;
      connection.query(sql, (error, result) =>{
      if(error) return console.log('error:'+error.sqlMessage);
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
           null,
          'pendiente',
          '${id_citizen}',
          '${data.category}'
        )`;
        connection.query(sql, (error, result) => {
          if(error) return console.log('errorSQL:'+error.sqlMessage);
          //guardar la foto
          base64Img.img('data:image/png;base64,'+data.photo, './uploads/alerts/', 'img_'+result.insertId, function(err, filepath) {
            if(err){
              console.log('err');
            }else{
              console.log('filepath: '+filepath);
            }
          });
          //enviar notificacion
            data.id=result.insertId;
            io.emit(`Alert`,data);
            
            console.log('alerta enviada');
        });
      });
    });


    



    socket.on('registerCrime',function(data){
      console.log(data);
    });




    
});


  