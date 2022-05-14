const Router = require('koa-router');
const { buyService } = require('../controller/client.controller');
const { 
  verifyAuth, 
  verifyPermission
} = require('../middleware/auth.middleware');
const { serviceExist } = require('../middleware/client.middleware');

const clientRouter = new Router();

clientRouter.post('/buyService', verifyAuth, verifyPermission(3), serviceExist, buyService)

module.exports = clientRouter