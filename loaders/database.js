const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = (dbConfig) => {
  return new Promise((res, rej) => {
    mongoose.connect(dbConfig.connectionString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    mongoose.connection.once('open', () => {
      logger.info('Database connection established');
      return res();
    });

    mongoose.connection.on('error', (err) => {
      logger.error('Error occurred on db connection', err);
      return rej(err);
    });

    mongoose.set('debug', logger.debug());

    mongoose.Promise = global.Promise;
  });
};
