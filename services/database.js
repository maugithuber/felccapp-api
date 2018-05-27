var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'localhost',   
   user: 'id5958990_root',      
   password: '214049973',
   database: 'id5958990_felccapp',
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