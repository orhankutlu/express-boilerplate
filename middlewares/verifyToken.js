const ApplicationError = require('../ApplicationError');
const ErrorCodes = require('../ErrorCodes');
const tokenManager = require('../utils/tokenManager');


const verifyToken = (secretKey) => {
  return async (request, response) => {
    const bearerToken = request.headers.authorization || '';
    const token = bearerToken.replace('Bearer ', '').trim();

    if (!token) {
      throw new ApplicationError({
        error: ErrorCodes.BadRequest,
        message: 'Token is missing'
      });
    }

    const decoded = tokenManager.decode(token, secretKey);

    if (!decoded) {
      throw new ApplicationError({
        error: ErrorCodes.NotAuthorized
      });
    }

    response.locals.token = decoded;
  };
};


module.exports = verifyToken;
