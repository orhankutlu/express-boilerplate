const ApplicationError = require('../ApplicationError');
const ErrorCodes = require('../ErrorCodes');

const checkScope = (requiredScope) => {
  return async (request, response) => {
    const { scopes = [] } = response.locals.token;

    if (!scopes.includes(requiredScope)) {
      throw new ApplicationError({
        error: ErrorCodes.NotAuthorized,
        message: 'Insufficient Permission',
        meta: {
          requiredScope
        }
      });
    }
  };
};

module.exports = checkScope;
