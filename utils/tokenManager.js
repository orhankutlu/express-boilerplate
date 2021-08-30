const jwt = require('jsonwebtoken');
const configs = require('../configs');

const TokenManager = {
  decode: (token) => {
    try {
      const decoded = jwt.verify(token, configs.auth.secret);
      return decoded;
    } catch (err) {
      return null;
    }
  },
  sign: (payload, options = {}) => {
    return jwt.sign(payload, configs.auth.secret, options);
  }
};


module.exports = TokenManager;
