'use strict'

var connection = require('../services/database');

function registerAlert(req,res){
    var params = req.body; 
    var id_user = req.params.id_user;
    console.log(params);
    if(params.lng && params.lat && params.id_citizen && params.id_category){ 
        var sql = `INSERT INTO alerts 
        VALUES(
        null,
        '${params.email}',
        '${params.name}',
        '${params.password}',
        'policeman'
        )`;



        var sql0= `SELECT id FROM districts WHERE id_user = ${id_user}`;
        connection.query(sql0, (error, result) =>{
            if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
            var id_district = result[0].id;
            console.log(id_district);
            
            bcrypt.hash( params.password, null ,null, (error,hash) =>{
                if(error) return res.status(404).send({message: 'hash error'});
                    params.password = hash;
                    var sql = `INSERT INTO users 
                                VALUES(
                                null,
                                '${params.email}',
                                '${params.name}',
                                '${params.password}',
                                'policeman'
                    )`;
                    connection.query(sql, (error, result) => {
                        if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                            var sql2 = `INSERT INTO policemen 
                                VALUES(
                                null,
                                '${params.grade}',
                                '${params.phone}',
                                'desconetado',
                                '${id_district}',
                                '${result.insertId}'
                                )`;
                            connection.query(sql2, (error, result) => {
                            if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                            res.status(200).send( {policemanId: result.insertId} );
                            });
                    });
            });
        });
    }else{
        res.status(404).send({message: 'envia todos los parametros necesarios'});
    }
}


function getAlerts(req,res){
        var sql= `SELECT * FROM alerts`;
        connection.query(sql, (error, result) =>{
        if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
        return res.status(200).send({ alerts:result});
        });
}

module.exports = {
    getAlerts,
    registerAlert
}
