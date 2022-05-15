const Router = require('koa-router');
const { 
  verifyAuth, 
  verifyPermission 
} = require('../middleware/auth.middleware');

const {
  releaseService,
  getServiceByUserId
} = require('../controller/freeman.controller');
const { categoryNotExist } = require('../middleware/freeman.middleware');

const freemanRouter = new Router({})

freemanRouter.post('/releaseService', verifyAuth, verifyPermission(2), categoryNotExist, releaseService);

freemanRouter.get('/getServiceByUserId', verifyAuth, verifyPermission(2), getServiceByUserId)

module.exports = freemanRouter