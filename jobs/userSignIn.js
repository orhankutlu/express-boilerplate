const UserManager = require('../business/UserManager');

const UserSignInJob = {
  handle: async ({
    user
  }) => {
    await UserManager.sendAuthEmail({ user });
  }
};

module.exports = UserSignInJob;
