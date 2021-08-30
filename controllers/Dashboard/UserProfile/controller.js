const UserProfileManager = require('../../../business/UserProfileManager');
const mutator = require('./mutator');

const UserProfileController = {
  get: async (request, { locals }) => {
    const { token } = locals;
    const user = await UserProfileManager.get(token.user.email);
    return mutator.get({ user });
  },
  update: async (request, { locals }) => {
    const { token } = locals;
    const {
      firstName,
      lastName,
      registrationCompleted,
      companyName,
      phoneNumber,
      status
    } = request.inputs;

    const user = await UserProfileManager.update(token.user.email, {
      firstName,
      lastName,
      registrationCompleted,
      companyName,
      phoneNumber,
      status
    });
    return mutator.get({ user });
  }
};

module.exports = UserProfileController;
