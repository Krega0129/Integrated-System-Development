const employeeService = require("../service/employee.service");
const errorTypes = require('../constants/error-types')
const errorEmitter = require('../utils/error-emitter')

const categoryExist = async (ctx, next) => {
  const {category} = ctx.request.body;
  const result = await employeeService.getCategoryById(category)

  if(result) {
    return errorEmitter(errorTypes.CATEGORY_ALREADY_EXIST, ctx)
  }

  await next()
}

module.exports = {
  categoryExist
}