const Router = require('koa-router');
const { 
  getUserList,
  addCategory,
  getProjectList
} = require('../controller/employee.controller');
const { 
  verifyAuth, 
  verifyPermission 
} = require('../middleware/auth.middleware');

const { 
  categoryExist 
} = require('../middleware/employee.middleware');

const employeeRouter = new Router();

// 获取用户列表
employeeRouter.get('/getUserList', verifyAuth, verifyPermission(1), getUserList);

// 创建分类
employeeRouter.post('/addCategory', verifyAuth, verifyPermission(1), categoryExist, addCategory)

// 获取项目
employeeRouter.get('/getProjectList', verifyAuth, verifyPermission(1), getProjectList)


module.exports = employeeRouter;