const configs = require('../configs');
const logger = require('../utils/logger');
const dbLoader = require('./database');
const routes = require('./routes');
const workerLoader = require('./worker');
const publisher = require('./publisher');

// Bootstrap
module.exports = async (app) => {
  logger.debug('Loaders initializing...');
  await routes(app);
  await dbLoader(configs.database);
  await workerLoader(configs.worker);
  await publisher(configs.publisher);
  logger.debug('Loaders initialized.');
};
