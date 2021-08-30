const sns = require('../../aws/sns');

const SNSPublisher = {
  _configs: null,

  init: ({
    env,
    topicPrefix
  }) => {
    SNSPublisher._configs = {
      env,
      topicPrefix
    };
  },

  fire: async ({ event, message }) => {
    const topicArn = SNSPublisher._getEventTopic(event);
    await sns.sendMessage({
      topicArn,
      messageBody: message,
    });
  },

  _getEventTopic: (event) => {
    if (SNSPublisher._configs.env === 'local') {
      return `${SNSPublisher._configs.topicPrefix}-all-events`;
    }

    return `${SNSPublisher._configs.topicPrefix}-${event.category}-${event.action}`;
  }
};

module.exports = SNSPublisher;
