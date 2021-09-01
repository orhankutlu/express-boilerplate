const logger = require('../utils/logger');

const JOBS_BY_EVENT = {
  USER_SIGN_IN: require('../jobs/userSignIn'),
};

const WorkerHandler = {
  handleQueueMessage: async (message) => {
    const job = JOBS_BY_EVENT[message.action];
    if (!job) {
      return;
    }
    try {
      await job.handle(message.data);
    } catch (e) {
      logger.error('Error while processing queue message', e);
    }
  },
};


module.exports = WorkerHandler;
