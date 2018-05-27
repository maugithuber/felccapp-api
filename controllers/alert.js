'use strict'

var connection = require('../services/database');

function getAlerts(req,res){
        var sql= `SELECT * FROM alerts`;
        connection.query(sql, (error, result) =>{
        if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
        return res.status(200).send({ alerts:result});
        });
}

module.exports = {
    getAlerts,
}
