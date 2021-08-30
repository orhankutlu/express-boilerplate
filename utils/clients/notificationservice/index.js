const Publisher = require('../../publisher');

const configs = {
  publisherConfig: {
    activeDriver: process.env.PUBLISHER_ACTIVE_DRIVER || 'sns',
    drivers: {
      kafka: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        brokers: (process.env.KAFKA_BROKERS || '').split(','),
        clientId: process.env.KAFKA_CLIENT_ID,
        groupId: process.env.SERVICE_NAME,
        topicPrefix: process.env.KAFKA_TOPIC_PREFIX,
      },
      sns: {
        topicPrefix: process.env.SNS_TOPIC_PREFIX,
      }
    }
  }
};

const NotificationService = {
  /** *
   *
   * @param to => [{
            "email":"test@myapp.com",
            "name": "My Dear User",
            "customSubject": "Test subject"
            }],
   *
   */
  sendUsingTemplate: async ({
    to,
    from: {
      email: fromEmail,
      name: fromName
    },
    template: {
      id: templateId,
      params: templateParams
    },
    categories,
    attachments
  }) => {
    const messageBody = {
      to,
      from: {
        email: fromEmail,
        name: fromName
      },
      template: {
        id: templateId,
        params: templateParams
      },
      categories,
      attachments
    };
    const driverConfig = configs.publisherConfig.drivers[configs.publisherConfig.activeDriver];
    await Publisher.init({
      activeDriver: configs.publisherConfig.activeDriver,
      config: driverConfig
    });
    const result = await Publisher.fire({ event: Publisher.events.NOTIFICATION_SEND_EMAIL, message: messageBody });
    return result;
  }
};

module.exports = NotificationService;
