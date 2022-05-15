const connections = require('../app/database')

class EmployeeService {
  async getUserList(role) {
    try {
      let statement = `SELECT id, account, name, sex, age, role FROM user`
      statement += role == 0 ? ';' : ' WHERE role = ?;'
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

  async getCategoryByName(category) {
    try {
      const statement = `SELECT * FROM category WHERE name = ?;`;
      const [result] = await connections.execute(statement, [category])
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
      let statement = `
        SELECT
          s.name projectName, s.category, s.price, s.introduction, s.createAt releaseTime, p.createAt buyTime,
          JSON_OBJECT('id', su.id, 'account', su.account, 'name', su.name, 'sex', su.sex, 'age', su.age) seller,
          JSON_OBJECT('id', bu.id, 'account', bu.account, 'name', bu.name, 'sex', bu.sex, 'age', bu.age) buyer
        FROM project p
        LEFT JOIN service s on s.id = p.serviceId
        LEFT JOIN user su ON su.id = s.seller
        LEFT JOIN user bu ON bu.id = p.buyer
      `;
      statement += category == 0 ? ';' : 'WHERE s.category = ?;'
      const [result] = await connections.execute(statement, [category]);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new EmployeeService()

