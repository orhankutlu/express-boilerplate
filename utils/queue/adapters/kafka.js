const logger = require('../../logger');

const KafkaClient = {

  getClient: ({
    username,
    password,
    mechanism = 'plain',
    clientId,
    brokers,
    connectionTimeout = 3000,
    requestTimeout = 3000,
    initialRetryTime = 500
  } = {}) => {
    const sasl = username && password ? { username, password, mechanism } : null;
    const options = {
      brokers,
      sasl,
      ssl: !!sasl,
      connectionTimeout,
      requestTimeout,
      retry: {
        initialRetryTime,
      }
    };
    if (clientId) {
      options.clientId = clientId;
    }
    const { Kafka } = require('kafkajs');
    const client = new Kafka(options);
    return client;
  },
};

const KafkaConsumer = {

  client: null,

  init: async ({
    username,
    password,
    mechanism = 'plain',
    clientId,
    brokers,
    groupId,
    subscriptions
  }, messageHandler) => {
    if (!KafkaConsumer.client) {
      KafkaConsumer.client = KafkaClient.getClient({
        username, password, mechanism, clientId, brokers
      }).consumer({ groupId });
    }
    logger.info('Connecting to kafka client...');
    await KafkaConsumer.client.connect();
    logger.info('Connected kafka client.');
    const promises = subscriptions.map((subscription) => {
      logger.info(`Trying to subscribe to: ${subscription}`);
      return KafkaConsumer.client.subscribe(subscription);
    });
    await Promise.allSettled(promises);
    await KafkaConsumer.client.run({
      eachMessage: async ({ topic, partition, message }) => {
        logger.info(`Received a message from Kafka topic: ${topic}, message: ${message}`);
        messageHandler({ topic, partition, message: message.value.toString() });
      },
    });
    return KafkaConsumer.client;
  },
};

module.exports = KafkaConsumer;
