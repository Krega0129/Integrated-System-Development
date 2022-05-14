const Router = require('koa-router');

const authRouter = new Router();

const {
  login,
  success
} = require('../controller/auth.controller')

const {
  verifyUser,
  verifyAuth
} = require('../middleware/auth.middleware')

// 登录
authRouter.post('/login', verifyUser, login)
// 测试登录
authRouter.get('/test', verifyAuth, success)

module.exports = authRouter