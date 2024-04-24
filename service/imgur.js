const axios = require('axios')
const config = require('../config/config.js')
require('dotenv').config()

exports.requestImgur = function(method, url, authKey, data, callback) {
  let Authorization = ''
  if ( authKey === 'auth-key') {
    Authorization = process.env.NUXT_ENV_IMGUR_AUTH_KEY
  } else {
    Authorization = process.env.NUXT_ENV_IMGUR_CLIENT_KEY
  }
  let axiosConfig = {
    method,
    maxBodyLength: Infinity,
    url: `${process.env.NUXT_ENV_IMGUR_API_URL}${url}`,
    headers: {
      Authorization
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
