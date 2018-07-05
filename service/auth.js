const config = require('../config/config.js')
const jwt = require('jsonwebtoken')
const request = require('request')

const decodeOption = {
    algorithms: config.auth.algorithms
}
const key = config.auth.key

function getAdminKey(callback){
    request.get(config.auth.adminUrl, function(err, resp, body){
        if(err){
            callback(err)
        }else{
            callback(null, JSON.parse(body)[config.auth.adminKeyName])
        }
    })
}

exports.authAsAdmin = function(token, callback){
    getAdminKey(function(err, key){
        if(err){
            callback(err)
        }else{
            jwt.verify(token, key, decodeOption, function(err, decoded){
                if(err){
                    callback(err);
                }else{
                    callback(null, decoded);
                }
            })
        }
    })
}

exports.auth = function(token, callback){
    jwt.verify(token, key, decodeOption, function(err, decoded){
        if(err){
            callback(err);
        }else{
            callback(null, decoded);
        }
    })
}