const logger = require('../utils/logger');

module.exports = (action) => {
  return async (req, res, next) => {
    logger.debug(`Action fired: ${action.name}`);
    const start = new Date();
    try {
      const data = await action(req, res);
      const duration = new Date() - start;

      logger.debug(`Action response sent: ${action.name} `, {
        duration: `${duration}ms`
      });
      if (!res.finished) {
        return res.ok(data);
      }
    } catch (err) {
      return next(err);
    }
  };
};
