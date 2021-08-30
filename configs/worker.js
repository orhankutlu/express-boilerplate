module.exports = {
  active: process.env.WORKER_ACTIVE === 'true',
  queue: {
    activeDriver: process.env.WORKER_DRIVER || 'sqs',
    drivers: {
      kafka: {
        config: {
          username: process.env.KAFKA_USERNAME,
          password: process.env.KAFKA_PASSWORD,
          brokers: (process.env.KAFKA_BROKERS || '').split(','),
          clientId: process.env.KAFKA_CLIENT_ID,
          groupId: process.env.KAFKA_CLIENT_GROUP_ID || process.env.SERVICE_NAME,
          subscriptions: [
            { topic: `${process.env.KAFKA_TOPIC_PREFIX}.my-topic`, fromBeginning: true }
          ]
        },
      },
      sqs: {
        config: {
          queueUrl: process.env.WORKER_SQS_URL,
        },
      }
    }
  },
};
