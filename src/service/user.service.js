const connections = require('../app/database')

class UserService {
  async register(user) {
    try {
      const {account, password, role} = user
      const statement = `INSERT INTO user (account, password, role) VALUES (?, ?, ?);`;
      const [result] = await connections.execute(statement, [account, password, role])
      return result
    } catch (e) {
      console.log(e);
    }
  }

  async getUserByName(account) {
    try {
      const statement = `SELECT * FROM user WHERE account = ?;`;
      const [result] = await connections.execute(statement, [account]);
      return result[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getRoleById(id) {
    try {
      const statement = `SELECT * FROM role WHERE id = ?;`;
      const [result] = await connections.execute(statement, [id]);
      return result[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getUserInfoById(id) {
    try {
      const statement = `SELECT id, account, name, role, sex, age FROM user WHERE id = ?;`;
      const [result] = await connections.execute(statement, [id]);
      return result[0];
    } catch (e) {
      console.log(e);
    }
  }

  async updateUserInfo(name, sex, age, userId) {
    try {
      const statement = `UPDATE user SET name = ?, sex = ?, age = ? WHERE id = ?;`;
      const [result] = await connections.execute(statement, [name, sex, age, userId])
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserService()