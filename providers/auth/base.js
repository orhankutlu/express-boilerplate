const logger = require('../../utils/logger');
const ApplicationError = require('../../ApplicationError');
const ErrorCodes = require('../../ErrorCodes');

class BaseAuthProvider {
  async retrieveByToken() {
    logger.error('BaseAuthProvider.retrieveByToken must be implemented.');
    throw new ApplicationError({
      error: ErrorCodes.NotImplemented,
      message: 'BaseAuthProvider.retrieveByToken must be implemented'
    });
  }

  async getProviderUrls() {
    logger.error('BaseAuthProvider.getProviderUrls must be implemented.');
    throw new ApplicationError({
      error: ErrorCodes.NotImplemented,
      message: 'BaseAuthProvider.getProviderUrls must be implemented'
    });
  }
}

module.exports = BaseAuthProvider;
