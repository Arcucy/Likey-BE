const crypto = require('crypto')
const rsa = require('js-crypto-rsa')
const B64js = require('base64-js')

// 字符串转换为 Uint8Array
const encoder = new TextEncoder()
const hashAlgorithm = 'SHA-256'

/**
 * 用来签名的小工具
 */
module.exports = {
  /**
   * 对数据签名，输入私钥，客户端
   * @param {String} key - jwk 格式私钥
   * @param {String} data - 需要签名的数据
   */
  async signMessage(key, data) {
    const sign = await rsa.sign(encoder.encode(data), key, hashAlgorithm)
    return sign
  },

  /**
   * 验证签名，输入公钥，服务端验证
   * @param {String} pub - 公钥
   * @param {String} signature - signMessage 获得的签名数据
   * @param {String} data - 之前签名的数据
   */
  async verifyMessage(pub, signature, data) {
    const res = await rsa.verify(encoder.encode(data), Buffer.from(signature, 'hex'), this.buildPubJWK(pub), hashAlgorithm)
    return res
  },

  /**
   * 通过传入的公钥值来转换为地址
   * @param {String} pub - 公钥
   */
  getAddressFromPub(pub) {
    return bufferTob64Url(
      hash(b64UrlToBuffer(pub))
    )
  },

  /**
   * 从 JWK n 字段构建 JWK
   * @param {*} pubField  - JWK 公钥字段 n
   */
  buildPubJWK(pubField) {
    return {
      kty: 'RSA',
      e: 'AQAB',
      n: pubField,
    }
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
