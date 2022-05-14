const errorTypes = require('../constants/error-types');
const clientService = require('../service/client.service');
const errorEmitter = require('../utils/error-emitter');

const serviceExist = async (ctx, next) => {
  const {serviceId} = ctx.request.body;

  const result = await clientService.getServiceById(serviceId);
  if(!result) {
    return errorEmitter(errorTypes.SERVICE_DOES_NOT_EXIST, ctx);
  }

  await next()
}

module.exports = {
  serviceExist
}