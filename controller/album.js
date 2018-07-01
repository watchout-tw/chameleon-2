const auth = require('../service/auth.js')
const imgur = require('../service/imgur.js')

const getIdFromUrl = function(url){
    let pattern = url.split('/')
    return pattern[1]
}

exports.getAlubumDetail = function(res, url){
    imgur.requestImgur('GET', `/album/${getIdFromUrl(url)}`, 'client-key', null, function(err, data){
        if(err){
            return res.json({
                success: false,
                message: err
            })
        }else{
            res.json({
                success: true,
                message: data
            })
        }
    })
}

exports.getAlubumImages = function(res, url){
    imgur.requestImgur('GET', `/album/${getIdFromUrl(url)}/images`, 'client-key', null, function(err, data){
        if(err){
          return res.json({
            success: false,
            message: err
          })
        }else{
          res.json({
            success: true,
            message: data
          })
        }
    })
}

exports.deleteAlbum = function(res, url, authToken){
    auth.auth(authToken, function(err, user){
        if(err){
            return res.json({
                success: false,
                message: err
            })
        }else{
            if(user.personaID > 2){
                return res.status(404).send('Not found');
            }
            imgur.requestImgur('DELETE', `/album/${user.imgur}`, 'auth-key', null, function(err, data){
                if(err){
                    res.json({
                        success: false,
                        message: err
                    })
                }else{
                    res.json({
                        success: true,
                        album: data
                    })
                }
            })
        }
    })
}

exports.createAlbum = function(res, authToken){
    auth.auth(authToken, function(err, user){
        if(err){
            return res.json({
                success: false,
                message: err
            })
        }else{
            let data = {
                title: user.handle,
                privacy: 'hidden'
            }
            imgur.requestImgur('POST', '/album', 'auth-key', data, function(err, data){
                if(err){
                    res.json({
                        success: false,
                        message: err
                    })
                }else{
                    res.json({
                        success: true,
                        album: data
                    })
                }
            })
        }
    })
}