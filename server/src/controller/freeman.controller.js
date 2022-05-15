const freemanService = require('../service/freeman.service');
const res = require('../utils/res');

class FreemanController {
  async releaseService(ctx, next) {
    const {name, price, category, introduction} = ctx.request.body;
    const {id} = ctx.user;

    const result = await freemanService.releaseService(name, price, category, introduction, id);

    ctx.body = res({
      data: result
    })
  }

  async getServiceByUserId(ctx, next) {
    const {id} = ctx.user
    const result = await freemanService.getServiceByUserId(id);
    ctx.body = res({data: result})
  }
}

module.exports = new FreemanController()