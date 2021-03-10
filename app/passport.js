'use strict'
const message = require('../config/message')
const jwt = require('jwt-simple')


module.exports = {

  /**
   * 允许未登录的情况，如果登录会解析 token
   * @param {Object} ctx 请求的 ctx 对象
   * @param {Function} next 执行下一个中间件的回调函数
   */
  async verify(ctx, next) {
    ctx.msg = getMessage(ctx)
    ctx.user = verifySessionToken(ctx) || {}

    await next()
  },

  /**
   * 必须登录，未登返回 401
   * @param {Object} ctx 请求的 ctx 对象
   * @param {Function} next 执行下一个中间件的回调函数
   */
  async authorize(ctx, next) {
    ctx.msg = getMessage(ctx)
    ctx.user = verifySessionToken(ctx) || {}
    if (!ctx.user || !ctx.user.id) {
      ctx.status = 401
      ctx.body = ctx.msg.unauthorized
      return
    }

    await next()
  },
}

/**
 * 根据请求头中的语言（lang）获取 message 对象
 * @param {*} ctx 请求的 ctx 对象
 */
function getMessage(ctx) {
  const lang = ctx.headers.lang
  return message.returnObj(lang)
}

function verifySessionToken(ctx) {
  const token = ctx.header['session-token']
  if (token && token !== 'undefined') {
    try {
      const decoded = jwt.decode(token, ctx.app.config.jwtTokenSecret)

      if (decoded.exp > Date.now()) {
        return {
          id: decoded.id,
          platform: decoded.platform,
        }
      }
    } catch (err) {
      this.logger.error(err)
    }
  }
}
