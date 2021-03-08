// app/router.js
const passport = require('./passport')

module.exports = app => {
  const { router, controller } = app
  router.get('/', passport.verify, controller.home.index)

  /** 记录登陆事件 */
  router.post('/record/login-event/:address', passport.verify, controller.record.loginEvent)

  /** Upload 上传 */
  router.post('/upload/image', passport.verify, controller.upload.image)
  router.post('/upload/announce', passport.verify, controller.upload.announce)
  router.post('/upload/finish', passport.verify, controller.upload.finish)

  /** auth */
  router.post('/auth/ar-jwk-sign', passport.verify, controller.auth.arSignLogin)
}
