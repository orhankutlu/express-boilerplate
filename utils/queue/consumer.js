const logger = require('../logger');

const QueueConsumer = {
  adapters: {
    kafka: require('./adapters/kafka'),
    sqs: require('./adapters/sqs'),
  },

  client: null,

  init: async ({ driver, config, messageHandler }) => {
    logger.info(`Connecting to queue with active driver: ${driver}`);
    if (!QueueConsumer.client) {
      QueueConsumer.client = await QueueConsumer.adapters[driver].init(config, messageHandler);
    }
    return QueueConsumer;
  }
};

module.exports = QueueConsumer;
