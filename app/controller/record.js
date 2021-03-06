const Controller = require('egg').Controller

class RecordController extends Controller {
  async loginEvent() {
    const ctx = this.ctx
    const address = ctx.params.address
    if (!address) return ctx.msg.paramsError
    const res = await this.service.record.loginEvent(address, ctx.request.ip)
    ctx.body = res ? ctx.msg.success : ctx.msg.failure
  }
}

module.exports = RecordController
