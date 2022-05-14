const errorTypes = require('../constants/error-types');
const res = require('../utils/res');

const errorHandler = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorTypes.REGISTER_INFO_IS_REQUIRED:
      status = 400;
      message = "register information is required"
      break;
    case errorTypes.USER_ALREADY_EXIST:
      status = 400;
      message = "user already exist"
      break;
    case errorTypes.ROLE_DOES_NOT_EXIST:
      status = 400;
      message = "the role does not exist"
      break;
    case errorTypes.LOGIN_INFO_IS_REQUIRED:
      status = 400;
      message = "login information is required"
      break;
    case errorTypes.USER_DOES_NOT_EXIST:
      status = 400;
      message = "user does not exist"
      break;
    case errorTypes.PASSWORD_IS_INCURRECT:
      status = 400;
      message = "password is incurrect"
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "unAuthorization"
      break;
    case errorTypes.NOPERMISSION:
      status = 403;
      message = "you have no permission"
      break;
    case errorTypes.CATEGORY_ALREADY_EXIST:
      status = 400;
      message = "category already exist"
      break;
    case errorTypes.CATEGORY_DOES_NOT_EXIST:
      status = 400;
      message = "category does not exist"
      break;
    case errorTypes.SERVICE_DOES_NOT_EXIST:
      status = 400;
      message = "service does not exist"
      break;
    default:
      status = 400
      message = "bad request"
      break;
  }

  // ctx.status = status;
  // ctx.message = message;

  ctx.body = res({
    code: status,
    message
  })
}

module.exports = errorHandler