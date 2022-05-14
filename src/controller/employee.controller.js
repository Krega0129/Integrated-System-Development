const employeeService = require('../service/employee.service')

class EmployeeController {
  async getUserList(ctx, next) {
    ctx.body = 'getUserList'
  }
}

module.exports = new EmployeeController()