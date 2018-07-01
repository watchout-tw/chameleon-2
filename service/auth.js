const config = require('../config/config.js')
const jwt = require('jsonwebtoken')

const decodeOption = {
    algorithms: config.auth.algorithms
}
const key = config.auth.key

exports.auth = function(token, callback){
    jwt.verify(token, key, decodeOption, function(err, decoded){
        if(err){
            callback(err);
        }else{
            callback(null, decoded);
        }
    })
}