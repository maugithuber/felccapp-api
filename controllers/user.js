'use strict'

var connection = require('../services/database');
var bcrypt = require('bcrypt-nodejs');   //encriptador
var jwt = require('../services/jwt');   //token

function registerPoliceman(req,res) {
    var params = req.body; 
    var id_user = req.params.id_user;
    console.log(params);
    if(params.email && params.name && params.password && params.grade && params.phone && id_user){ 
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

function registerCitizen(req,res) {
    var params = req.body; 
    console.log(params);
    if(params.email && params.name && params.password && params.ci && params.phone){ 

                    bcrypt.hash( params.password, null ,null, (error,hash) =>{
                        if(error) return res.status(404).send({message: 'hash error'});
                            params.password = hash;
                            var sql = `INSERT INTO users 
                                        VALUES(
                                        null,
                                        '${params.email}',
                                        '${params.name}',
                                        '${params.password}',
                                        'citizen'
                            )`;
                            connection.query(sql, (error, result) => {
                                if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                                sql = `INSERT INTO citizens 
                                VALUES(
                                null,
                                '${params.ci}',
                                null,
                                null,
                                '${params.phone}',
                                null,
                                '${result.insertId}'
                                )`;
                                    connection.query(sql, (error, result) => {
                                    if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                                    res.status(200).send( {citizenId: result.insertId} );
                                    });
                            });
                    });
          
     
    }else{
        res.status(404).send({message: 'envia todos los parametros necesarios'});
    }
}

function login(req,res){
    var params = req.body;
    if(params.email && params.password){ 
        var sql = `SELECT * FROM users WHERE email = '${params.email}' `;
        connection.query(sql, (error, result) => {  
            if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
            if( result.length >= 1 ){
            bcrypt.compare( params.password, result[0].password,(err,check)=>{ 
            if(check){
                            if(params.token){   //si se envia el paramentro gettoken
                                //generar y devolver token
                                return res.status(200).send({ token: jwt.createToken( result[0] ) });
                            }else{
                                //devolver datos del usuario
                                result[0].password = undefined; // eliminar el password para no devolverlo
                                return res.status(200).send({ result: result[0]});
                            }
                        }else{
                            return res.status(404).send({ message: 'el usuario no se ha podido identificar' });
                        }
                    });
                }else{
                    return res.status(404).send({ message: 'los credenciales no coinciden' });
                }
            });
    }else{
        res.status(404).send({message: 'envia todos los parametros necesarios'});
    }
}

function getPolicemen(req,res){
    var params = req.body; 
    var id_user = req.params.id_user;
    if(id_user){ 
        var sql= `SELECT id AS id_district FROM districts WHERE id_user = ${id_user}`;
        connection.query(sql, (error, result) =>{
            if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                var id_district = result[0].id_district;
                sql = `SELECT COUNT(id) AS qty FROM policemen WHERE id_district = ${id_district}`;
                connection.query(sql,(err,result)=>{
                    if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                        var qty = result[0].qty;
                        sql = `
                        SELECT policemen.id ,users.name,users.email,policemen.grade,policemen.phone
                        FROM policemen,users
                        WHERE policemen.id_user = users.id AND  id_district = ${id_district}
                        ORDER BY id desc
                        `;
                        connection.query(sql,(err,result)=>{
                        if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                            return res.status(200).send({policemen: result , qyt: qty , id_district:id_district});
                        });    
                });
        });
    }else{
        res.status(200).send({message: 'envia todos los parametros necesarios'});
    }
}

function editPoliceman(req,res){
    var params = req.body; 
    var id_policeman = req.params.id_policeman;
    if(params.grade && params.phone && id_policeman){ 
        console.log(id_policeman);
        var sql= `UPDATE policemen SET grade = '${params.grade}',phone = '${params.phone}' WHERE id = ${id_policeman}`;
        connection.query(sql, (error, result) =>{
            if(error) return res.status(404).send({message: 'errorSQL:'+error.sqlMessage});
            res.status(200).send({message: 'policia actualizado'});
        });

    }else{
        res.status(200).send({message: 'envia todos los parametros necesarios'});
    }
}

function deletePoliceman(req,res){
    var id_policeman = req.params.id_policeman;
    if(id_policeman ){ 
        var sql= `SELECT id_user FROM policemen WHERE id = ${id_policeman}`;
        connection.query(sql, (error, result) =>{
            if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
            var id_user = result[0].id_user;

            sql= `DELETE FROM users WHERE id = ${id_user}`;
            connection.query(sql, (error, result) =>{
                if(error) return res.status(404).send({message: 'error:'+error.sqlMessage});
                res.status(200).send({message: 'policia eliminado'});
            });
    
        });


    }else{
        res.status(404).send({message: 'envia todos los parametros necesarios'});
    }
}




module.exports = {
    registerPoliceman,
    registerCitizen,
    login,
    getPolicemen,
    editPoliceman,
    deletePoliceman
}