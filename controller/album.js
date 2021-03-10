const auth = require('../service/auth.js')
const imgur = require('../service/imgur.js')

exports.getAlubumDetail = function(res, authToken) {
  auth.auth(authToken, function(err, user) {
    if(err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      imgur.requestImgur('GET', `/album/${user.albumID}`, 'client-key', null, function(err, albumInfo) {
        if(err) {
          res.json({
            success: false,
            message: err
          })
        } else {
          res.json({
            success: true,
            album: albumInfo.data
          })
        }
      })
    }
  })
}

exports.getAlubumImages = function(res, authToken) {
  auth.auth(authToken, function(err, user) {
    if(err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      imgur.requestImgur('GET', `/album/${user.albumID}/images`, 'client-key', null, function(err, imagesInfo) {
        if(err) {
          res.json({
            success: false,
            message: err
          })
        } else {
          res.json({
            success: true,
            images: imagesInfo.data
          })
        }
      })
    }
  })
}

exports.deleteAlbum = function(res, authToken, hash) {
  auth.authAsAdmin(authToken, function(err, user) {
    if(err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      imgur.requestImgur('DELETE', `/album/${hash}`, 'auth-key', null, function(err, data) {
        if(err) {
          res.json({
            success: false,
            message: err
          })
        } else {
          res.json({
            success: true,
            album: data
          })
        }
      })
    }
  })
}

exports.createAlbum = function(res, authToken, title) {
  auth.authAsAdmin(authToken, function(err, admin) {
    if(err) {
      return res.json({
        success: false,
        message: err
      })
    } else {
      let data = {
        title: title,
        privacy: 'hidden'
      }
      imgur.requestImgur('POST', '/album', 'auth-key', data, function(err, albumInfo) {
        if(err) {
          res.json({
            success: false,
            message: err
          })
        } else {
          res.json({
            success: true,
            album: albumInfo.data.id
          })
        }
      })
    }
  })
}