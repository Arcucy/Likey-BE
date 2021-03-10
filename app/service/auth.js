'use strict'
const Service = require('egg').Service

const jwt = require('jwt-simple')
const moment = require('moment')

// const TABLE = {
//   loginRecord: 'login_record',
// }

class AuthService extends Service {
  /**
   * 验证 AR 的 JWK 签名
   * @param {*} pub 公钥
   * @param {*} signature 签名
   * @param {*} data 被签名的数据
   */
  async arSign(pub, signature, data) {
    // 校验签名
    const isPassed = await this.ctx.jwt.verifyMessage(pub, signature, data)
    if (!isPassed) throw 'authSignVerifyFailed'

    const dataObj = JSON.parse(data)
    const address = this.ctx.jwt.getAddressFromPub(pub)
    // 校验地址
    if (dataObj.address !== address) throw 'authSignVerifyFailed'

    // 校验时间，签名时间与当前服务器时间的差超过 1 小时的，不予通过
    const jetLag = Math.abs(Date.now() - dataObj.timestamp)
    if (jetLag > 3600000) throw 'authSignHasExpired'
    return address
  }

  /**
   * 生成 JSON Web Token
   * @param {Number} userId 用户 ID
   * @param {platformType} platform 登录平台
   */
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
