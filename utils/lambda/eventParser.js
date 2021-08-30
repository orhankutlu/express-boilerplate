const ApplicationError = require('../errors/ApplicationError');
const ErrorCodes = require('../errors/ErrorCodes');

const eventParser = {
  parseEventBody: (event) => {
    try {
      if (Array.isArray(event.Records) && event.Records.length) {
        const body = JSON.parse(event.Records[0].body);
        return body;
      }
      return JSON.parse(event.body);
    } catch (error) {
      throw new ApplicationError({
        error: ErrorCodes.InternalServerError,
        message: `Error while parsing event body ${error.message}`,
      });
    }
  },
  parseEventQuery: (event) => {
    return event.queryStringParameters;
  }
};

module.exports = eventParser;
