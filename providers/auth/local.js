const ErrorCodes = require('../../ErrorCodes');
const ApplicationError = require('../../ApplicationError');

class BaseAuthProvider {
  async retrieveByToken() {
    throw new ApplicationError({
      error: ErrorCodes.IntegrationError,
      message: 'Cannot retrieve by token with local provider'
    });
  }

  async getProviderUrls() {
    return null;
  }
}

module.exports = BaseAuthProvider;
