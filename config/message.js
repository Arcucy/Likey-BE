'use strict'

// 错误码统一编码，提示信息多语言
module.exports = {

  // 成功
  success: 0,

  // 通用错误码
  // 失败
  failure: 1,
  // 参数错误
  paramsError: 2,
  // 没有权限
  unauthorized: 401,
  // 内部服务器错误
  serverError: 500,
  // 你好世界
  helloWorld: 1000,

  // fs/io
  io: {
    fileReadError: 5101,
    fileWriteError: 5102,
    fileNotFound: 404,
    directoryCreationError: 5111,
    directoryUnlinkError: 5112,
  },

  // Redis
  redis: {
    readError: 6001,
    writeError: 6002,
    deleteError: 6003,
  },

  mysql: {
    internalError: 5001,
  },

  // Upload Error
  upload: {
    announceCheckFailed: 20100,
    finishCheckFailed: 20200,
    fileMismatchedAnnouncedTxId: 20300,
  },

  // Authentication Error
  auth: {
    signVerifyFailed: 30100,
    accountHasBeenRegistered: 30200,
    signHasExpired: 30300,
  },

  wrongMusicType: 10101,

  returnObj(lang) {

    /** 英文 */
    const en = {
      lang: 'en',
      success: { code: this.success, message: 'success' },
      failure: { code: this.failure, message: 'failure' },
      paramsError: { code: this.paramsError, message: 'parameter error' },
      unauthorized: { code: this.unauthorized, message: 'unauthorized' },
      serverError: { code: this.serverError, message: 'internal server error' },
      helloWorld: { code: this.helloWorld, message: 'Hello world' },
      fileNotFound: { code: this.io.fileNotFound, message: 'The Resource that you requested is not exist' },
      uploadAnnounceCheckFailed: { code: this.upload.announceCheckFailed, message: 'Upload Announce Check Failed' },
      uploadAnnounceInternalError: { code: this.serverError, message: 'Upload Announce Internal Error' },
      uploadAnnounceReadToCacheFailed: { code: this.redis.readError, message: 'Upload Announce Read to Cache Failed' },
      uploadFinishCheckFailed: { code: this.upload.finishCheckFailed, message: 'Upload Finish Check Failed' },
      uploadFinishInternalError: { code: this.serverError, message: 'Upload Finish Internal Error' },
      uploadFinishWriteFailed: { code: this.mysql.internalError, message: 'Upload Finish Write Failed' },
      uploadFinishDeletionToCacheFailed: { code: this.redis.writeError, message: 'Upload Finish Deletion to Cache Failed' },
      uploadFileMismatchedAnnouncedTXID: { code: this.upload.fileMismatchedAnnouncedTxId, message: 'Upload File Mismatched Announced TX ID' },
      uploadFileReadFailed: { code: this.io.fileReadError, message: 'Upload File Read Failed' },
      uploadFileWriteFailed: { code: this.io.fileWriteError, message: 'Upload File Write Failed' },
      uploadDirectoryCreationFailed: { code: this.io.directoryCreationError, message: 'Upload Directory Creation Failed' },
      wrongMusicType: { code: this.wrongMusicType, message: 'Wrong music type' },

      // Authentication Error
      authSignVerifyFailed: { code: this.auth.signVerifyFailed, message: 'Signature verification failed' },
      authAccountHasBeenRegistered: { code: this.auth.accountHasBeenRegistered, message: 'Account has been registered' },
      authSignHasExpired: { code: this.auth.signHasExpired, message: 'Signature has expired' },
    }

    /** 中文 */
    const zh = {
      lang: 'zh',
      success: { code: this.success, message: '成功' },
      failure: { code: this.failure, message: '失败' },
      paramsError: { code: this.paramsError, message: '参数错误' },
      unauthorized: { code: this.unauthorized, message: '未授权' },
      serverError: { code: this.serverError, message: '服务器内部错误' },
      helloWorld: { code: this.helloWorld, message: '你好，世界' },
      uploadAnnounceCheckFailed: { code: this.upload.announceCheckFailed, message: '上传预检查错误' },
      fileNotFound: { code: this.io.fileNotFound, message: '你请求的资源不存在或无权限' },
      uploadAnnounceInternalError: { code: this.serverError, message: '上传预检查内部错误' },
      uploadAnnounceReadToCacheFailed: { code: this.redis.readError, message: '上传预检查缓存错误' },
      uploadFinishCheckFailed: { code: this.upload.finishCheckFailed, message: '上传结束检查错误' },
      uploadFinishInternalError: { code: this.serverError, message: '上传结束内部错误' },
      uploadFinishWriteFailed: { code: this.mysql.internalError, message: '上传结束写入错误' },
      uploadFinishDeletionToCacheFailed: { code: this.redis.writeError, message: '上传结束删除缓存错误' },
      uploadFileMismatchedAnnouncedTXID: { code: this.upload.fileMismatchedAnnouncedTxId, message: '上传文件校验失败' },
      uploadFileReadFailed: { code: this.io.fileReadError, message: '上传文件读取错误' },
      uploadFileWriteFailed: { code: this.io.fileWriteError, message: '上传文件写入错误' },
      uploadDirectoryCreationFailed: { code: this.io.directoryCreationError, message: '上传路径创建失败' },
      wrongMusicType: { code: this.wrongMusicType, message: '查询失败，错误的音乐类型' },

      // Authentication Error
      authSignVerifyFailed: { code: this.auth.signVerifyFailed, message: '签名验证失败' },
      authAccountHasBeenRegistered: { code: this.auth.accountHasBeenRegistered, message: '账号已被注册' },
      authSignHasExpired: { code: this.auth.signHasExpired, message: '签名已过期' },
    }

    let message

    // 将 lang 转换为全小写
    if (lang && typeof lang === 'string') lang = lang.toLowerCase()

    // 请在这个 switch 处配置语言名称 和 message 的对应关系
    switch (lang) {
      case 'en':
        message = en
        break
      case 'zh':
      case 'zh-cn':
      case 'zh-hans':
        message = zh
        break
      default:
        message = en
        break
    }

    /**
     * 通过错误代码获取 msg
     * @param {Number} code 错误代码
     */
    message.get = function(code) {
      const _this = this
      const keys = Object.keys(_this)
      let ret
      for (const key of keys) {
        if (_this[key].code === code) {
          ret = _this[key]
          break
        }
      }
      return ret
    }

    return message
  },

}
