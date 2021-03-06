'use strict'
const Service = require('egg').Service
const moment = require('moment')

const TABLE = {
  loginRecord: 'login_record',
}

class RecordService extends Service {
  async loginEvent(address, ip) {
    const sql = `
      INSERT INTO ${TABLE.loginRecord}
        (address, first_login_time, last_login_time, ip_address)
      VALUES
        (:address, :now, :now, :ip)
      ON DUPLICATE KEY UPDATE
        last_login_time = VALUES(last_login_time),
        ip_address = VALUES(ip_address);
    `
    const res = await this.app.db.growth.query(sql, {
      address,
      now: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      ip,
    })
    return res.affectedRows > 0
  }
}


module.exports = RecordService
