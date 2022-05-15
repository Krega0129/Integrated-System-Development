const connections = require('../app/database')

class EmployeeService {
  async getUserList(role) {
    try {
      const statement = `SELECT id, account, name, sex, age, role FROM user WHERE role = ?;`;
      const [result] = await connections.execute(statement, [role]);
      return result;
    } catch(e) {
      console.log(e);
    }
  }

  async getCategoryById(id) {
    try {
      const statement = `SELECT * FROM category WHERE id = ?;`;
      const [result] = await connections.execute(statement, [id])
      return result[0]
    } catch (e) {
      console.log(e);
    }
  }

  async addCategory(category) {
    try {
      const statement = `INSERT INTO category (name) VALUES (?);`;
      const [result] = await connections.execute(statement, [category]);
      return result
    } catch (e) {
      console.log(e);
    }
  }

  async getProjectList(category) {
    try {
      const statement = `
        SELECT
          s.name projectName, s.category, s.introduction, s.seller, s.price, p.buyer, s.createAt createTime
        FROM service s
        LEFT JOIN project p ON p.serviceId = s.id
        LEFT JOIN user su ON su.id = s.seller
        LEFT JOIN user bu ON bu.id = p.buyer
        WHERE s.category = ?;
      `;
      const [result] = await connections.execute(statement, [category]);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new EmployeeService()

