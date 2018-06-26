'use strict'

var connection = require('../services/database');

function getCrimes(req,res){
        var sql= `SELECT * FROM crimes order by id desc`;
        connection.query(sql, (error, result) =>{
        if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
        console.log(result[0]);
        return res.status(200).send({ crimes:result});
        });
}





module.exports = {
    getCrimes
}
