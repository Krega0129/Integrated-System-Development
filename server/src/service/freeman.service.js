const connections = require('../app/database')

class FreemanService {
  async releaseService(name, price, category, introduction, seller) {
    try {
      const statement = `INSERT INTO service (name, price, category, introduction, seller) VALUES (?, ?, ?, ?, ?);`;
      const [result] = await connections.execute(statement, [name, price, category, introduction, seller]);
      return result[0]
    } catch (e) {
      console.log(e);
    }
  }

  async getServiceByUserId(userId) {
    try {
      const statement = `
        SELECT DISTINCT s.id, s.name, s.createAt releaseTime, s.category, s.price, s.introduction, 
        JSON_OBJECT('id', su.id, 'account', su.account, 'name', su.name, 'sex', su.sex, 'age', su.age) seller,
        IF(p.buyer, JSON_OBJECT('id', bu.id, 'account', bu.account, 'name', bu.name, 'sex', bu.sex, 'age', bu.age), NULL) buyer
        FROM service s
        LEFT JOIN user su ON su.id = s.seller
        LEFT JOIN project p on s.id = p.serviceId
        LEFT JOIN user bu ON bu.id = p.buyer
        WHERE s.seller = ?;
      `;
      const [result] = await connections.execute(statement, [userId]);
      result.forEach(n => {
        n.sold = !!n.buyer
      })
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FreemanService()