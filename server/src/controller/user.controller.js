const userService = require("../service/user.service");
const res = require('../utils/res')


class UserController {
  async register(ctx, next) {
    const user = ctx.request.body;
    const result = await userService.register(user)
    ctx.body = res({data: result})
  }

  async getUserInfo(ctx, next) {
    const {id} = ctx.user;
    const result = await userService.getUserInfoById(id);
    ctx.body = res({
      data: result
    })
  }

  async updateUserInfo(ctx, next) {
    const {name, sex, age} = ctx.request.body
    const {id} = ctx.user
    const result = await userService.updateUserInfo(name, sex, age, id)
    ctx.body = res({})
  }

  async getCategory(ctx, next) {
    const result = await userService.getCategory();
    ctx.body = res({
      data: result
    })
  }
}

module.exports = new UserController()