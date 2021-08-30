const KafkaPublisher = {
  _client: null,
  init: async ({
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
    const kafkaClient = new Kafka(options);
    KafkaPublisher._client = await kafkaClient.producer();
    await KafkaPublisher._client.connect();
  },

  fire: async ({ event, message }) => {
    await KafkaPublisher._client.send({
      topic: KafkaPublisher._getEventTopic(event),
      messages: [{
        value: message
      }],
    });
  },

  _getEventTopic: (event) => {
    return `${KafkaPublisher.config.topicPrefix}.${event.category}.${event.action}`;
  }
};

module.exports = KafkaPublisher;
