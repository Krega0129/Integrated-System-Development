const clientService = require("../service/client.service");
const res = require("../utils/res");

class ClientController {
  async buyService(ctx, next) {
    const {serviceId} = ctx.request.body;
    const {id} = ctx.user
    const result = await clientService.buyService(serviceId, id)

    ctx.body = res({
      data: result
    })
  }

  async getService(ctx, next) {
    const {id} = ctx.user
    const result = await clientService.getService(id);

    ctx.body = res({
      data: result
    })
  }

  async getServiceOrders(ctx, next) {
    const {id} = ctx.user
    const result = await clientService.getServiceOrders(id);

    ctx.body = res({
      data: result
    })
  }
}

module.exports = new ClientController()