const logger = require('../utils/logger');

module.exports = (action) => {
  return async (req, res, next) => {
    logger.debug(`Middleware fired: ${action.name}`);
    try {
      await action(req, res);
      return next();
    } catch (err) {
      return next(err);
    }
  };
};
