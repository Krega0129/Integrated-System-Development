const Router = require('koa-router');

const {
  register,
  updateUserInfo,
  getUserInfo,
  getCategory
} = require('../controller/user.controller')

const {
  verifyUser,
  handlePassword
} = require('../middleware/user.middleware')

const {
  verifyAuth,

} = require('../middleware/auth.middleware')

const userRouter = new Router({prefix: '/user'});

// 注册
userRouter.post('/register', verifyUser, handlePassword, register);
userRouter.get('/getUserInfo', verifyAuth, getUserInfo)
// 修改个人信息
userRouter.patch('/updateUserInfo', verifyAuth, updateUserInfo)
// 查询分类
userRouter.get('/getCategory', getCategory)

module.exports = userRouter