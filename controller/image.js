const FormData = require('form-data')
const config = require('../config/config.js')
const imgur = require('../service/imgur.js')
const auth = require('../service/auth.js')

exports.uploadImage = function(res, authToken, body) {
  console.log('image called', authToken, body)
  auth.auth(authToken, function(err, user) {
    if(err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      let imageInfo = new FormData()
      imageInfo.append('description', body.description ? body.description : '')
      imageInfo.append('image', body.image)
      imageInfo.append('title', body.title ? body.title : '')
      imageInfo.append('type', 'base64')

      imgur.requestImgur('post', '/image', 'client-key', imageInfo, (err, data) => {
        if(err) {
          return res.json({
            success: false,
            message: err
          })
        } else {
          return res.json({
            success: true,
            image: data.data.link.replace(config.imgur.imageUrl, config.iwaa.url)
          })
        }
      })
    }
  })
}
