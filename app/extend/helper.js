// app/extend/helper.js
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
}
