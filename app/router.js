// app/router.js
const passport = require('./passport')

module.exports = app => {
  const { router, controller } = app
  router.get('/', passport.verify, controller.home.index)

  /** 内容获取 */
  router.get('/content/image/:subpath', passport.verify, controller.content.image.image)

  /** Upload 上传 */
  router.post('/upload/image', passport.verify, controller.upload.image)
  router.post('/upload/announce', passport.verify, controller.upload.announce)
  router.post('/upload/finish', passport.verify, controller.upload.finish)

  /** auth */
  router.post('/auth/ar-jwk-sign', passport.verify, controller.auth.arJwkSignLogin)
}
