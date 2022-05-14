const connections = require('../app/database')

class ClientService {
  async buyService(serviceId, buyer) {
    try {
      const {seller} = await this.getServiceById(serviceId);
      const statement = `INSERT INTO project (serviceId, seller, buyer) VALUES (?, ?, ?);`;
      const [result] = await connections.execute(statement, [serviceId, seller, buyer]);
      return result[0]
    } catch (e) {
      console.log(e);
    }
  }

  async getServiceById(serviceId) {
    try {
      const statement = `SELECT * FROM service WHERE id = ?;`;
      const [result] = await connections.execute(statement, [serviceId]);
      return result[0];
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ClientService()