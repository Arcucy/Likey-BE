'use strict'

const fs = require('mz/fs')
const Controller = require('egg').Controller

class ContantImageController extends Controller {
  async cover() {
    const { ctx } = this
    let res = await this.app.db.growth.query(`SELECT cover_type FROM single WHERE cover = '${ctx.params.tx}';`)
    res = JSON.parse(JSON.stringify(res))

    if (res.length === 0) {
      ctx.body = ctx.msg.fileNotFound
      return
    }

    const type = res[0].cover_type

    const getExt = {
      'image/png': '.png',
      'image/jpeg': '.jpg',
      'image/webp': '.webp',
    }

    ctx.type = type
    ctx.body = fs.readFileSync('./content/cover/' + ctx.params.tx + getExt[type])
  }
}

module.exports = ContantImageController
