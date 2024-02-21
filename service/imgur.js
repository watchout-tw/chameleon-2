const axios = require('axios')
const config = require('../config/config.js')

exports.requestImgur = function(method, url, authKey, data, callback) {
  let axiosConfig = {
    method,
    maxBodyLength: Infinity,
    url: `${config.imgur.apiUrl}${url}`,
    headers: {
      Authorization: config.imgur[authKey]
    }
  }

  if(method != 'GET') {
    axiosConfig.data = data
  }

  axios(axiosConfig).then(response => {
    callback(null, response.data)
  }).catch(err => {
    console.log('err', err)
    callback(err)
  })
}
