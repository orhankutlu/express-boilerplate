const { Consumer } = require('sqs-consumer');
const logger = require('../../logger');

const SQSConsumer = {

  client: null,

  init: async ({
    queueUrl,
  }, messageHandler) => {
    if (!SQSConsumer.client) {
      logger.info('sqs initializing...');
      SQSConsumer.client = Consumer.create({
        queueUrl,
        handleMessage: (message) => {
          messageHandler({ message: message.Body });
        },
      });
    }
    SQSConsumer.client.on('error', (e) => logger.error('error on sqs client', e));
    SQSConsumer.client.on('processing_error', (e) => logger.error('sqs processing sqs message', e));
    await SQSConsumer.client.start();
    logger.info('sqs initialized.');
    return SQSConsumer.client;
  },
};

module.exports = SQSConsumer;
