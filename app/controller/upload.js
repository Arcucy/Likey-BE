const Controller = require('egg').Controller
const fs = require('mz/fs').promises
const path = require('path')
const mkdirp = require('mkdirp')

class UploadController extends Controller {
  async announce() {
    const { ctx } = this
    const { info } = ctx.request.body
    const rawInfo = JSON.parse(await Buffer.from(JSON.parse(info)).toString('utf-8'))

    const res = await this.service.upload.cacheMusicTxId(rawInfo)

    if (res.code !== 0) {
      ctx.body = ctx.msg.uploadAnnounceInternalError
    } else {
      ctx.body = res
    }
  }

  async finish() {
    const { ctx } = this

    if (!ctx.request.query.info) {
      ctx.body = { code: 1, message: 'Missing Parameters' }
      return
    }
    // const { info } = ctx.request.query

    // const res2 = await this.service.upload.appendSingleMusicInfo(info)
    // if (!res2) ctx.body = ctx.msg.serverError

    const res1 = await this.service.upload.clearMusicTxId(info, 'info')
    if (!res1) ctx.body = ctx.msg.serverError
    ctx.body = { code: 0, message: res2 }
  }

  async image() {
    const { ctx } = this
    ctx.body = ctx.request
    const { txid } = ctx.request.query
    const file = ctx.request.files[0]

    // const coverTxid = await this.app.redis.growth.get('coverTx:' + txid)
    // if (!coverTxid) {
    //   ctx.body = ctx.msg.uploadFinishInternalError
    //   return
    // }

    const fileTxid = path.parse(file.filename).name

    if (coverTxid !== fileTxid) {
      ctx.body = ctx.msg.uploadFileMismatchedAnnouncedTXID
      return
    }

    const filename = {
      name: path.parse(file.filename).name,
      ext: path.parse(file.filename).ext,
    }

    if (filename.ext === '.jpg' || filename.ext === '.jpeg') filename.ext = '.jpg'

    try {
      // process file or upload to cloud storage
      const read = await fs.readFile(file.filepath)

      await mkdirp('./content/image')
      await fs.writeFile(path.join('./content/image/' + filename.name + filename.ext), read)
    } catch (e) {
      ctx.body = ctx.msg.uploadFileWriteFailed
      return
    } finally {
      // remove tmp files and don't block the request's response
      // cleanupRequestFiles won't throw error even remove file io error happen
      // ctx.cleanupRequestFiles()
      // remove tmp files before send response
      await ctx.cleanupRequestFiles()
    }

    let result = ''
    try {
      result = await this.service.upload.appendImage(txid, file.mime)
    } catch (e) {
      ctx.body = ctx.msg.uploadFileWriteFailed
      return
    }

    let res = {}
    if (result) res = ctx.msg.success
    else res = ctx.msg.failure

    ctx.body = {
      code: res.code,
      message: res.message,
      url: '/content/image/' + file.filename,
    }
  }
}

module.exports = UploadController
