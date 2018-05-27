'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_felccapp';

exports.createToken = function( user ){
    var payload = {
        id: user.id,   //id
        name: user.name,
        email: user.email,
        role: user.role,
        iat: moment().unix(),   //fecha
        exp: moment().add(30, 'days').unix()  // expiracion en 30 dias
    };
    return jwt.encode(payload,secret);
};