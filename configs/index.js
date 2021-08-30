module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || '3000',
  serviceName: process.env.SERVICE_NAME,
  baseRoute: process.env.SERVICE_ROUTE || process.env.SERVICE_NAME,
  timezone: process.env.TIMEZONE || 'UTC',
  logger: require('../utils/logger'),
  database: require('./database'),
  auth: require('./auth'),
  cors: require('./cors'),
  worker: require('./worker'),
  business: require('./business'),
  publisher: require('./publisher'),
};
