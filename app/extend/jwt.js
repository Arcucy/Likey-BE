const crypto = require('crypto')
const jwkToPem = require('jwk-to-pem')
const pem2jwk = require('pem-jwk').pem2jwk
const B64js = require('base64-js')

/**
 * 用来签名的小工具
 */
module.exports = {
  /**
   * 将 jwk 转换为 PEM 格式的 RSA 密钥
   * @param {Object} input jwk 对象
   * @param {*} mode 输出模式：['private': 私钥, 'public': 公钥]
   */
  toPem(input, mode) {
    let key = ''
    if (mode === 'private') {
      key = jwkToPem(input, { private: true })
    } else if (mode === 'public') {
      key = jwkToPem(input)
    }
    return key
  },

  /**
   * 对数据签名，输入私钥，客户端
   * @param {String} pri - 私钥
   * @param {String} data - 需要签名的数据
   */
  signMessage(pri, data) {
    // 创建签名
    const sign = crypto.createSign('sha384')
    sign.update(data)
    const signature = sign.sign(pri, 'hex')
    return signature
  },

  /**
   * 验证签名，输入公钥，服务端验证
   * @param {String} pub - 公钥
   * @param {String} signature - signMessage 获得的签名数据
   * @param {String} data - 之前签名的数据
   */
  verifyMessage(pub, signature, data) {
    const verify = crypto.createVerify('sha384')
    verify.update(data)
    return verify.verify(pub, signature, 'hex')
  },

  /**
   * 通过传入的公钥值来转换为地址
   * @param {String} pub - 公钥
   */
  getAddressFromPub(pub) {
    const owner = pem2jwk(pub).n
    return bufferTob64Url(
      hash(b64UrlToBuffer(owner))
    )
  },
}

function hash(string) {
  return crypto.createHash('sha256').update(string).digest()
}

function b64UrlToBuffer(b64UrlString) {
  return new Uint8Array(B64js.toByteArray(b64UrlDecode(b64UrlString)))
}

function bufferTob64(buffer) {
  return B64js.fromByteArray(new Uint8Array(buffer))
}

function bufferTob64Url(buffer) {
  return b64UrlEncode(bufferTob64(buffer))
}

function b64UrlEncode(b64UrlString) {
  return b64UrlString
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/\=/g, '')
}

function b64UrlDecode(b64UrlString) {
  b64UrlString = b64UrlString.replace(/\-/g, '+').replace(/\_/g, '/')
  let padding
  b64UrlString.length % 4 === 0
    ? (padding = 0)
    : (padding = 4 - (b64UrlString.length % 4))
  return b64UrlString.concat('='.repeat(padding))
}
