const logger = require('../utils/logger');
const QueueConsumer = require('../utils/queue/consumer');
const WorkerHandler = require('../handlers/workerHandler');


module.exports = async (workerConfig) => {
  if (!workerConfig.active) {
    return;
  }
  const { activeDriver } = workerConfig.queue;
  const { config } = workerConfig.queue.drivers[activeDriver];

  await QueueConsumer.init({
    driver: activeDriver,
    config,
    messageHandler: async ({ message }) => {
      logger.info('Queue message received', message);
      message = JSON.parse(message);
      await WorkerHandler.handleQueueMessage(message);
    }
  });
};
