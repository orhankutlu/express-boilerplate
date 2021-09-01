const ApplicationError = require('../../ApplicationError');
const ErrorCodes = require('../../ErrorCodes');
const logger = require('../logger');

const Publisher = {
  events: {
    // User
    USER_SIGN_IN: {
      name: 'USER_SIGN_IN',
      category: 'user',
      action: 'sign-in'
    },

  },
  _driver: null,
  adapters: {
    kafka: require('./adapters/kafka'),
    sns: require('./adapters/sns'),
  },
  init: async ({
    config,
    activeDriver
  }) => {
    if (Publisher._driver) {
      return;
    }
    Publisher._driver = Publisher.adapters[activeDriver];

    if (!Publisher._driver) {
      throw new ApplicationError({
        error: ErrorCodes.InternalServerError,
        message: 'No publisher driver is given',
      });
    }

    logger.info(`Initializing publisher with the driver: ${activeDriver}`);
    Publisher._driver.config = config;
    await Publisher._driver.init(config);
    logger.info('Publisher is initialized');
  },

  fire: async ({ event, message }) => {
    logger.info(`"${event.name}" fired with message: `, message);

    if (Publisher._driver === null) {
      throw new ApplicationError({
        error: ErrorCodes.InternalServerError,
        message: 'Publisher must be initialized before firing the message',
      });
    }

    try {
      const messageBody = JSON.stringify({
        action: event.name,
        data: message
      });

      await Publisher._driver.fire({ event, message: messageBody });
    } catch (e) {
      throw new ApplicationError({
        error: ErrorCodes.InternalServerError,
        message: `Can't fire event error: ${e.message}`
      });
    }
  },
};

module.exports = Publisher;
