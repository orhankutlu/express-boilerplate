const Joi = require('joi');
const ApplicationError = require('../ApplicationError');
const ErrorCodes = require('../ErrorCodes');

module.exports = (schema) => {
  if (!Joi.isSchema(schema)) {
    throw new ApplicationError({
      error: ErrorCodes.InternalServerError,
      message: 'Invalid joi schema given',
      meta: {
        schema
      }
    });
  }

  const isValidHandler = async (request) => {
    const inputs = {
      ...request.body,
      ...request.params,
      ...request.query
    };

    const { error, value } = schema.validate(inputs);

    if (error) {
      throw new ApplicationError({
        error: ErrorCodes.BadRequest,
        message: 'Invalid Inputs Given',
        meta: {
          details: error.message
        }
      });
    }

    request.inputs = value;
  };

  return isValidHandler;
};
