'use strict'
const Service = require('egg').Service

const jwt = require('jwt-simple')
const moment = require('moment')

// const TABLE = {
//   loginRecord: 'login_record',
// }

class AuthService extends Service {
  arSign(pub, signature, data) {
    // 校验签名
    const isPassed = this.ctx.jwt.verifyMessage(pub, signature, data)
    if (!isPassed) return null

    const dataObj = JSON.parse(data)
    const address = this.ctx.jwt.getAddressFromPub(pub)
    // 校验地址
    if (dataObj.address !== address) return null

    // 校验时间，签名时间与当前服务器时间的差超过 1 小时的，不予通过
    // const jetLag = Math.abs(Date.now() - dataObj.timestamp)
    // if (jetLag > 3600000) return null
    return address
  }

  // jwt token
  jwtSign(userId, platform) {
    const expires = moment().utc().add(7, 'days')
      .valueOf()
    const jwttoken = jwt.encode({
      id: userId,
      exp: expires,
      platform,
    }, this.app.config.jwtTokenSecret)

    return jwttoken
  }
}

module.exports = AuthService
