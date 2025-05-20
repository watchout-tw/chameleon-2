const FormData = require('form-data')
const imgur = require('../service/imgur.js')
const auth = require('../service/auth.js')

exports.uploadImage = function(res, authToken, body) {
  console.log('image called', authToken, body)

  auth.auth(authToken, function(err, user) {
    if(err) {
      console.error('Authentication error:', err)
      return res.status(401).json({
        success: false,
        message: err.message || 'Authentication failed' // 使用 err.message 或通用訊息
      })
    }
    let imageInfo = new FormData()
    imageInfo.append('description', body.description ? body.description : '')
    imageInfo.append('image', body.image)
    imageInfo.append('title', body.title ? body.title : '')
    imageInfo.append('type', 'base64')

    imgur.requestImgur('post', '/image', 'client-key', imageInfo, (err, data) => {
      if(err) {
        const { status, data } = err.response
        console.error('Imgur API request error:', data)
        console.error(err.status)
        return res.status(status).json({
          success: false,
          message: data || 'Image upload to Imgur failed'
        })
      } else {
        // 即使 err 為 null，也檢查 Imgur 回傳的 data 是否真的成功
        // 有些 API 可能 err 為 null 但 data.success 為 false 或 data.status 非 200
        if (!data || data.success === false || (data.data && !data.data.link)) {
          console.error('Imgur API reported an issue or missing link, even if no direct error:', data)
          // 如果 Imgur 回傳的 data 中明確指出錯誤 (例如 data.status != 200)
          // 你可以使用 data.status 或預設 400
          const imgurStatus = (data && typeof data.status === 'number' && data.status !== 200) ? data.status : 400
          const errorMessage = (data && data.data && data.data.error) ? data.data.error : 'Imgur API returned success but link is missing or operation failed internally.'

          return res.status(imgurStatus).json({
            success: false,
            message: errorMessage
          })
        }

        return res.status(data.status).json({
          success: true,
          image: data.data.link.replace(process.env.NUXT_ENV_IMGUR_IMAGE_URL, process.env.NUXT_ENV_IWAA_CREATE_URL)
        })
      }
    })
  })
}
