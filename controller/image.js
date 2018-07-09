const config = require('../config/config.js')
const imgur = require('../service/imgur.js')
const auth = require('../service/auth.js')

exports.uploadImage = function(res, authToken, body){
    console.log('image called', authToken, body)
    auth.auth(authToken, function(err, user){
        if(err){
            return res.json({
                success: false,
                message: err
            })
        }else{
            let imageInfo = {
                image: body.image,
                title: body.title,
                album: user.albumID || '',
                description: body.description
            }
            imgur.requestImgur('POST', '/image', 'auth-key', imageInfo, function(err, data){
                if(err){
                    return res.json({
                        success: false,
                        message: err
                    })
                }else{
                    return res.json({
                        success: true,
                        image: data.data.link.replace(config.imgur.imageUrl, config.iwaa.url)
                    })
                }
            })
        }
    })
}
