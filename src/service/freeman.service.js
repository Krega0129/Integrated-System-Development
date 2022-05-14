const connections = require('../app/database')

class FreemanService {
  async releaseService(name, price, category, seller) {
    try {
      const statement = `INSERT INTO service (name, price, category, seller) VALUES (?, ?, ?, ?);`;
      const [result] = await connections.execute(statement, [name, price, category, seller]);
      return result[0]
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FreemanService()