const Router = require('koa-router');
const { 
  buyService, 
  getService,
  getServiceOrders
} = require('../controller/client.controller');
const { 
  verifyAuth, 
  verifyPermission
} = require('../middleware/auth.middleware');
const { serviceExist } = require('../middleware/client.middleware');

const clientRouter = new Router();

clientRouter.get('/getService', verifyAuth, verifyPermission(3), getService)

clientRouter.post('/buyService', verifyAuth, verifyPermission(3), serviceExist, buyService)

clientRouter.get('/getServiceOrders', verifyAuth, verifyPermission(3), getServiceOrders)

module.exports = clientRouter