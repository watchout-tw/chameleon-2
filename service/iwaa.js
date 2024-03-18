const config = require('../config/config.js')
const request = require('request');

exports.getWaaUrl = function(url, callback) {
  let requestConfig = {
    method: 'POST',
    url: config.iwaa.url,
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
