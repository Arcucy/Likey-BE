'use strict'
const message = require('../config/message')

module.exports = {

  // 验证登录token，未登录不抛异常
  async verify(ctx, next) {

    ctx.user = {}
    ctx.msg = getMessage(ctx)

    await next()
  },

  // 验证登录，未登录抛异常
  // async authorize(ctx, next) {
  //   await next()
  // },
}

function getMessage(ctx) {
  const lang = ctx.headers.lang
  return message.returnObj(lang)
}
