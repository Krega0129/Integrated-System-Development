const employeeService = require('../service/employee.service');
const res = require('../utils/res');

class EmployeeController {
  async getUserList(ctx, next) {
    const {role} = ctx.query
    const result = await employeeService.getUserList(role);

    ctx.body = res({
      data: result
    })
  }

  async addCategory(ctx, next) {
    const {category} = ctx.request.body

    await employeeService.addCategory(category)

    ctx.body = res({})
  }

  async getProjectList(ctx, next) {
    const {category} = ctx.query

    const result = await employeeService.getProjectList(category);

    ctx.body = res({
      data: result
    })
  }
}

module.exports = new EmployeeController()