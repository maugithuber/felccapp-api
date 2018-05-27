var mysql = require('mysql');
var connection = mysql.createConnection({
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