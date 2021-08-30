const UserManager = require('../business/UserManager');

const UserAccountCreatedJob = {
  handle: async ({
    user
  }) => {
    await UserManager.sendWelcomeEmail({ user });
  }
};

module.exports = UserAccountCreatedJob;
