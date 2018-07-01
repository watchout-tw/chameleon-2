const imgur = require('../service/imgur.js')
const iwaa = require('../service/iwaa.js')

exports.uploadImage = function(res, authToken, body){
    console.log('image called', authToken, body)
    let imageInfo = {
        image: body.image,
        title: body.title,
        album: body.album,
        description: body.description
    }
    imgur.requestImgur('POST', '/image', 'auth-key', imageInfo, function(err, data){
        if(err){
            return res.json({
                success: false,
                message: err
            })
        }else{
            iwaa.getWaaUrl(data.data.link, function(error, url){
                if (error) {
                    return res.json({
                        success: false,
                        message: error
                    })
                }else{
                    console.log('update end', data.data, url)
                    res.json({
                        success: true,
                        image: url
                    })
                }
            })

        }
    })
}
