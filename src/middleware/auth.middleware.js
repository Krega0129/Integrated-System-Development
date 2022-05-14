const authService = require('../service/auth.service')
const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const errorEmitter = require('../utils/error-emitter');
const md5Password = require('../utils/password-handler');
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config');

// 登录验证
const verifyUser = async (ctx, next) => {
  const {account, password} = ctx.request.body;

  if(!account || !password) {
    return errorEmitter(errorTypes.LOGIN_INFO_IS_REQUIRED, ctx);
  }

  const user = await userService.getUserByName(account);
  if(!user) {
    return errorEmitter(errorTypes.USER_DOES_NOT_EXIST, ctx);
  }

  if(md5Password(password) !== user.password) {
    return errorEmitter(errorTypes.PASSWORD_IS_INCURRECT, ctx)
  }

  ctx.user = user;
  
  await next()
}

// token 验证
const verifyAuth = async (ctx, next) => {
  try {
    // 获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ', '');
    // 验证 token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result
    await next()
  } catch (e) {
    return errorEmitter(errorTypes.UNAUTHORIZATION)
  }
}

// 验证身份
const verifyPermission = async (ctx, next) => {
  
}

module.exports = {
  verifyUser,
  verifyAuth,
  verifyPermission
}