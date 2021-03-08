'use strict'
const Service = require('egg').Service

const { platformType } = require('../constant/Enums')

class UserService extends Service {

  /**
   * 创建用户
   * @param {Object} userInfo 请填写与数据库中 users 表相同的结构
   * @param {Object} userAccount 请填写与数据库中 user_accounts 表相同的结构
   */
  async createUser(userInfo, userAccount) {
    // 使用事务进行多条的 mysql 处理
    const conn = await this.app.db.growth.beginTransaction()
    try {
      // 如果注册的登陆方式存在唯一索引，则检查是否已被注册
      if (userAccount.index) {
        const account = await conn.get('user_accounts', {
          platform: userAccount.platform,
          index: userAccount.index,
        })
        if (account) throw 'authAccountHasBeenRegistered'
      }
      const uRes = await conn.insert('users', userInfo)
      const userId = uRes.insertId
      await conn.insert('user_accounts', {
        ...userAccount,
        user_id: userId,
      })
      await conn.commit()
      return userId
    } catch (err) {
      await conn.rollback()
      throw err
    }
  }

  /**
   * 获取用户的基础信息
   * @param {Number} userId 用户 ID
   */
  async get(userId) {
    const res = await this.app.db.growth.get('users', { id: userId })
    return res
  }

  /**
   * 根据 AR 钱包地址获取用户的基础信息
   * @param {String} address 地址
   */
  async getUserInfoByAddress(address) {
    const account = await this.app.db.growth.get('user_accounts', {
      platform: platformType.arweave,
      index: address,
    })
    if (!account) return null
    return this.get(account.user_id)
  }
}

module.exports = UserService
