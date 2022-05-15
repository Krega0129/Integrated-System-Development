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

  async getService(userId) {
    try {
      const statement = `
        SELECT DISTINCT s.id, s.name, s.createAt releaseTime, s.category, s.price, s.introduction, 
          JSON_OBJECT('id', su.id, 'account', su.account, 'name', su.name, 'sex', su.sex, 'age', su.age) seller,
        IF(p.buyer = ?, TRUE, FALSE) hasBought
        FROM service s
        LEFT JOIN user su ON su.id = s.seller
        LEFT JOIN project p on s.id = p.serviceId
        LEFT JOIN user bu ON bu.id = p.buyer;
      `
      const [result] = await connections.execute(statement, [userId])
      return result
    } catch (e) {
      console.log(e);
    }
  }

  async getServiceOrders(userId) {
    try {
      const statement = `
        SELECT DISTINCT s.id, s.name, s.createAt releaseTime, p.createAt buyTime, s.category, s.price, s.introduction, 
          JSON_OBJECT('id', su.id, 'account', su.account, 'name', su.name, 'sex', su.sex, 'age', su.age) seller
        FROM service s
        LEFT JOIN user su ON su.id = s.seller
        LEFT JOIN project p on s.id = p.serviceId
        WHERE p.buyer = ?;
      `;
      const [result] = await connections.execute(statement, [userId])
      return result
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new ClientService()