const Joi = require('joi');
const logger = require('./utils/logger');
const ApplicationError = require('./errors/ApplicationError');
const ErrorCodes = require('./errors/ErrorCodes');

module.exports = async (schema, data) => {
  if (!Joi.isSchema(schema)) {
    throw new ApplicationError({
      error: ErrorCodes.InternalServerError,
      message: 'Invalid joi schema provided',
      meta: {
        schema
      }
    });
  }
  const { error, value } = await schema.validate(data);
  if (error) {
    throw new ApplicationError({
      error: ErrorCodes.BadRequest,
      message: 'Invalid parameters',
      meta: {
        details: error.details
      }
    });
  }
  logger.debug(value);
  return value;
};
