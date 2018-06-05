var mysql = require('mysql');
var connection = mysql.createConnection({
//    host: '5.79.67.193',   
//    user: 'mauricio',      
//    password: '214049973',
//    database: 'felccapp',
//    port: 3306


host: 'localhost',   
user: 'root',      
password: '',
database: 'felccapp',
port: 3306

});

connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('query ejecutada correctamente');
   }
});

module.exports = connection;