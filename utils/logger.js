const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.colorize({ all: process.env.LOG_COLORIZE || process.env.NODE_ENV === 'local' }),
  ),
  defaultMeta: {
    env: process.env.NODE_ENV,
    serviceName: process.env.SERVICE_NAME
  },
  transports: [
    new winston.transports.Console(),
  ]
});

module.exports = logger;
