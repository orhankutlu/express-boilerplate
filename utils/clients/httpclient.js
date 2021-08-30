const axios = require('axios');
const Qs = require('qs');
const ApplicationError = require('../errors/ApplicationError');
const ErrorCodes = require('../errors/ErrorCodes');
const logger = require('../utils/logger');

const httpClient = {
  send: async ({
    method = 'GET',
    url,
    qs,
    body,
    headers,
    auth
  }) => {
    try {
      logger.info(`HttpClient.send request started. URL:${url}`, {
        qs,
        body
      });

      const response = await axios({
        method,
        url,
        params: qs,
        data: body,
        headers,
        auth,
        paramsSerializer(params) {
          return Qs.stringify(params, { arrayFormat: 'brackets' });
        },
      });

      logger.info(`HttpClient.send request ended with. URL:${url}`, {
        response
      });

      return response.data;
    } catch (error) {
      let { message } = error;
      if (error.response) {
        const { data } = error.response;
        if (data.error) {
          message = `${data.error.type} ${data.error.message}`;
        } else {
          message = data.message;
        }
      }
      throw new ApplicationError({
        error: ErrorCodes.IntegrationError,
        message,
        meta: {
          error
        }
      });
    }
  }
};
module.exports = httpClient;
