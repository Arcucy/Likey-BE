// app/extend/helper.js
const url = require('url')
const moment = require('moment')

module.exports = {
  relativeTime(time) { return moment(new Date(time * 1000)).fromNow() },

  /**
   * 根据捕获的错误返回错误信息 body， 如果不存在对应的错误信息 body 则继续弹出错误。
   * @param {*} err 错误
   * @param {*} msg ctx.msg 对象
   */
  getMsgByThrowErr(err, msg) {
    if (typeof err === 'string') {
      const body = msg[err]
      if (body) return body
    }
    throw err
  },

  /**
   * 用于设置 Cookies 中的用户登录凭证。(被废弃了)
   * @param {Object} ctx ctx 对象
   * @param {String} jwt 该用户的 jsonWebToken
   * @param {Number} userId 用户 ID
   * @param {Number} loginPlatform 登录平台 ID
   */
  setSessionToken(ctx, jwt, userId, loginPlatform) {
    const whiteList = ctx.app.config.cookiesWhites
    const hostname = url.parse(ctx.request.header.origin).hostname
    const host = url.parse(ctx.request.header.origin).host
    let domain = ''
    if (whiteList.indexOf(host) !== -1) domain = host
    else if (whiteList.indexOf(hostname) !== -1) domain = hostname

    // 因为 session_token 没有关闭 httpOnly，前端 JS 不能直接访问，
    // 所以需要而外设置 user_id 和 login_platform 给前端获取数据使用。
    ctx.cookies.set('session_token', jwt, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
      encrypt: true,
      secure: false,
      domain,
    })
    ctx.cookies.set('user_id', String(userId), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
      httpOnly: false,
      secure: false,
      domain,
    })
    ctx.cookies.set('login_platform', String(loginPlatform), {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      overwrite: true,
      httpOnly: false,
      secure: false,
      domain,
    })
  },
}
