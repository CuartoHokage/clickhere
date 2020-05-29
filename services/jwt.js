'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "ss"

exports.createToken = function(user, pass) {
    var payload = {
        user: user,
        pass: pass,
        iat: moment().unix(),
        exp: moment().add(30, 'day').unix
    }
    return jwt.encode(payload, secret)
}