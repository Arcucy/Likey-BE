const Controller = require('egg').Controller

class AuthController extends Controller {
  /** 获取用户信息。默认获取 params.id 的数据，如果没有则获取当前登录用户的信息 */
  async get() {
    const ctx = this.ctx
    const { id } = ctx.params
    const userId = id || ctx.user.id

    const res = await this.service.user.get(userId)
    ctx.body = {
      ...ctx.msg.success,
      data: res,
    }
  }
}

module.exports = AuthController
