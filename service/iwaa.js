const request = require('request');
require('dotenv').config()

exports.getWaaUrl = function(url, callback) {
  let requestConfig = {
    method: 'POST',
    url: process.env.NUXT_ENV_IWAA_CREATE_URL,
    json: { "url": url }
  }
  request(requestConfig, function(err, resp, body) {
    if(err) {
      callback(err)
    } else {
      callback(null, body.url)
    }
  })
}
