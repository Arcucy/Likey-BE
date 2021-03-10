// app/router.js
const passport = require('./passport')

module.exports = app => {
  // 说明：
  // API 的数据返回格式请遵守 “{ code: 0, message: 'success', data: 「数据」 }” 格式
  // 对于返回分页数据的，在 data 内返回 “{ list: 「列表」, count: 「总数」 }”

  // 关于接口的权限管理：
  // verify:      不需要登录，如果登录会解析 token
  // authorize:   必须登录，未登返回 401

  const { router, controller } = app
  router.get('/', passport.verify, controller.home.index)

  /** Upload 上传 */
  router.post('/upload/image', passport.verify, controller.upload.image)
  router.post('/upload/announce', passport.verify, controller.upload.announce)
  router.post('/upload/finish', passport.verify, controller.upload.finish)

  /** auth */
  router.post('/auth/ar-jwk-sign', passport.verify, controller.auth.arJwkSignLogin)

  /** user */
  router.get('/user/info', passport.authorize, controller.user.get)
  router.get('/user/info/:id', passport.verify, controller.user.get)
}
