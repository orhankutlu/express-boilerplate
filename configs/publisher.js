module.exports = {
  activeDriver: process.env.PUBLISHER_ACTIVE_DRIVER || 'sns',
  drivers: {
    kafka: {
      username: process.env.KAFKA_USERNAME,
      password: process.env.KAFKA_PASSWORD,
      brokers: (process.env.KAFKA_BROKERS || '').split(','),
      clientId: process.env.KAFKA_CLIENT_ID,
      groupId: process.env.SERVICE_NAME,
      topicPrefix: process.env.KAFKA_TOPIC_PREFIX
    },
    sns: {
      env: process.env.NODE_ENV || 'uat',
      topicPrefix: process.env.SNS_TOPIC_PREFIX
    }
  }
};
