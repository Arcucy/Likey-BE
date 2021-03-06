// app/controller/home.js
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    console.log('GET \'/\' return:', this.ctx.msg.helloWorld.message)
    this.ctx.body = this.ctx.msg.helloWorld
  }
}

module.exports = HomeController
