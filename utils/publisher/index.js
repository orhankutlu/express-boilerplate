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

    USER_ACCOUNT_CREATED: {
      name: 'USER_ACCOUNT_CREATED',
      category: 'user',
      action: 'account-created'
    },

    // Campaign
    CAMPAIGN_START: {
      name: 'CAMPAIGN_START',
      category: 'campaign',
      action: 'start'
    },
    CAMPAIGN_SEND_REMINDER: {
      name: 'CAMPAIGN_SEND_REMINDER',
      category: 'campaign',
      action: 'send-reminder'
    },
    CAMPAIGN_BULK_ORDER_CREATE: {
      name: 'CAMPAIGN_BULK_ORDER_CREATE',
      category: 'campaign',
      action: 'bulk-order-create'
    },

    // Order
    ORDER_ACCEPTED: {
      name: 'ORDER_ACCEPTED',
      category: 'order',
      action: 'accepted'
    },
    ORDER_INJECTED: {
      name: 'ORDER_INJECTED',
      category: 'order',
      action: 'injected'
    },

    // Automation
    AUTOMATION_CHECK: {
      name: 'AUTOMATION_CHECK',
      category: 'automation',
      action: 'check'
    },
    AUTOMATION_INITIALIZE: {
      name: 'AUTOMATION_INITIALIZE',
      category: 'automation',
      action: 'initialize'
    },
    AUTOMATION_RUN: {
      name: 'AUTOMATION_RUN',
      category: 'automation',
      action: 'run'
    },
    AUTOMATION_BULK_ORDER_CREATE: {
      name: 'AUTOMATION_BULK_ORDER_CREATE',
      category: 'automation',
      action: 'bulk-order-create'
    },

    AUTOMATION_SEND_REMINDER: {
      name: 'AUTOMATION_SEND_REMINDER',
      category: 'automation',
      action: 'send-reminder'
    },

    // Notification
    NOTIFICATION_SEND_EMAIL: {
      name: 'email.sendUsingTemplate',
      category: 'notification',
      action: 'send-email',
    },

    // Contact
    CONTACT_CREATE: {
      name: 'CONTACT_CREATE',
      category: 'contact',
      action: 'create-contact',
    },

    // Product
    PRODUCT_BULK_UPSERT: {
      name: 'PRODUCT_BULK_UPSERT',
      category: 'product',
      action: 'bulk-upsert',
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
