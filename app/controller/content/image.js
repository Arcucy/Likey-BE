'use strict'

const fs = require('mz/fs')
const Controller = require('egg').Controller

class ContantImageController extends Controller {
  async image() {
    const { ctx } = this
    const { subpath } = ctx.params

    if (!(subpath.contains('.') && subpath.split('.').length > 1)) {
      ctx.status = 404
      ctx.body = 'Resource Not Found'
    }

    const getType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.webp': 'image/webp'
    }

    const ext = subpath.split('.').pop()
    if (Object.keys(getType).indexOf(ext) === -1) {
      ctx.status = 400
      ctx.body = 'Resource Invalid'
    }

    ctx.type = type
    ctx.body = fs.readFileSync('./content/image/' + subpath + getType[ext])
  }
}

module.exports = ContantImageController
