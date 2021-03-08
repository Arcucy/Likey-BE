// app/controller/home.js
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    this.ctx.body = this.ctx.msg.helloWorld
  }
}

module.exports = HomeController
