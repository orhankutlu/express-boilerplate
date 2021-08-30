const jwt = require('jsonwebtoken');

const TokenManager = {
  verify: (token, key) => {
    try {
      const decoded = jwt.verify(token, key);
      return decoded;
    } catch (err) {
      return null;
    }
  },
  sign: (payload, secret, options = {}) => {
    return jwt.sign(payload, secret, options);
  }
};


module.exports = TokenManager;
