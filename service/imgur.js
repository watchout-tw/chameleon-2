const config = require('../config/config.js')
const request = require('request');

exports.requestImgur = function(method, url, authKey, data, callback) {
  let requestConfig = {
    method: method,
    url: `${config.imgur.apiUrl}${url}`,
    headers: { Authorization: config.imgur[authKey] }
  }
  if(method != 'GET') {
    requestConfig.json = data;
  }
  request(requestConfig, function(err, resp, body) {
    if(err) {
      console.log('err', err)
      callback(err)
    } else {
      callback(null, body)
    }
  })
}