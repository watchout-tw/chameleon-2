const axios = require('axios')

exports.requestImgur = function(method, url, authKey, data, callback) {
  let axiosConfig = {
    method,
    maxBodyLength: Infinity,
    url: `${process.env.NUXT_ENV_IMGUR_API_URL}${url}`,
    headers: {
      Authorization: process.env.NUXT_ENV_IMGUR_AUTH_KEY
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
