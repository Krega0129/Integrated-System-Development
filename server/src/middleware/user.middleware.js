const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service');
const errorEmitter = require('../utils/error-emitter');
const md5Password = require('../utils/password-handler')

const verifyUser = async (ctx, next) => {
  const {account, password, role} = ctx.request.body;
  if(!account || !password || !role) {
    return errorEmitter(errorTypes.REGISTER_INFO_IS_REQUIRED, ctx);
  }
  
  const accountResult = await userService.getUserByName(account);
  
  if(accountResult) {
    // 用户名已存在
    return errorEmitter(errorTypes.USER_ALREADY_EXIST, ctx);
  }
  
  const roleResult = await userService.getRoleById(role);
  if(!roleResult) {
    // 没有该角色
    return errorEmitter(errorTypes.ROLE_DOES_NOT_EXIST, ctx);
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body;
  // 加密
  ctx.request.body.password = md5Password(password);

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}