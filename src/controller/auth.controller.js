const jwt = require('jsonwebtoken');
const {
  PRIVATE_KEY
} = require('../app/config');
const res = require('../utils/res');

class AuthController {
  async login(ctx, next) {
    const {id, account, name, role} = ctx.user;
    const token = jwt.sign({id, account, name, role}, PRIVATE_KEY, {
      expiresIn: 24*60*60,
      algorithm: 'RS256'
    })

    ctx.body = res({
      data: {
        id,
        account,
        name,
        role,
        token
      }
    })
  }

  async success(ctx, next) {
    ctx.body = 'success'
  }
}

module.exports = new AuthController()