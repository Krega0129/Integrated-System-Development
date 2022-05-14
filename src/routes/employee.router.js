const Router = require('koa-router');
const { getUserList } = require('../controller/employee.controller');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');

const employeeRouter = new Router({prefix: '/employee'});

employeeRouter.get('/getUserList', verifyAuth, verifyPermission, getUserList)

module.exports = employeeRouter;