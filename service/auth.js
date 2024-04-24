const jwt = require('jsonwebtoken')
const request = require('request')
require('dotenv').config()

const decodeOption = {
  algorithms: process.env.NUXT_ENV_AUTH_ALGORITHMS
}

const key = process.env.NUXT_ENV_AUTH_KEY

function getAdminKey(callback) {
  request.get(process.env.NUXT_ENV_AUTH_ADMIN_URL, function(err, resp, body) {
    if(err) {
      callback(err)
    } else {
      callback(null, JSON.parse(body)[process.env.NUXT_ENV_AUTH_ADMIN_KEY_NAME])
    }
  })
}

exports.authAsAdmin = function(token, callback) {
  getAdminKey(function(err, key) {
    if(err) {
      callback(err)
    } else {
      jwt.verify(token, key, decodeOption, function(err, decoded) {
        if(err) {
          callback(err);
        } else {
          callback(null, decoded);
        }
      })
    }
  })
}

exports.auth = function(token, callback) {
  jwt.verify(token, key, decodeOption, function(err, decoded) {
    if(err) {
      callback(err);
    } else {
      callback(null, decoded);
    }
  })
}
