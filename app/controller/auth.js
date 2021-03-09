const Controller = require('egg').Controller

const { platformType } = require('../constant/Enums')
const moment = require('moment')

class AuthController extends Controller {
  // Arweave 签名验证登陆
  async arJwkSignLogin() {
    const ctx = this.ctx
    const { pub, signature, data } = ctx.request.body
    if (!pub || !signature || !data) {
      ctx.body = ctx.msg.paramsError
      return
    }

    // 验证签名，返回钱包地址
    let address = ''
    try {
      address = this.service.auth.arSign(pub, signature, data)
    } catch (err) {
      ctx.body = this.ctx.helper.getMsgByThrowErr(err, ctx.msg)
      return
    }
    if (!address) {
      ctx.body = ctx.msg.authSignVerifyFailed
      return
    }

    // 获取用户信息
    const user = await this.service.user.getUserInfoByAddress(address)
    let userId = null
    let isNewUser = false
    // 取得 userId
    if (user) userId = user.id
    else {
      // 如果用户不存在，则创建新用户
      isNewUser = true
      try {
        userId = await this.service.user.createUser({
          nickname: address.slice(address.length - 8),
          create_time: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        }, {
          platform: platformType.arweave,
          index: address,
        })
      } catch (err) {
        ctx.body = this.ctx.helper.getMsgByThrowErr(err, ctx.msg)
        return
      }
    }
    if (!userId) {
      ctx.body = ctx.msg.failure
      return
    }
    const jwt = this.service.auth.jwtSign(userId, platformType.arweave)
    ctx.body = {
      ...ctx.msg.success,
      userId,
      isNewUser,
      jwt,
    }
  }
}

module.exports = AuthController
