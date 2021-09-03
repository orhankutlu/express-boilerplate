const UserManager = require('../../../business/UserManager');
const mutator = require('./mutator');

const UserProfileController = {
  get: async (request, { locals }) => {
    const { token } = locals;
    const user = await UserManager.getOne({ id: token.id });
    return mutator.get({ user });
  },
  update: async (request, { locals }) => {
    const { token } = locals;
    const {
      username,
      fullName,
      email,
      profilePhoto
    } = request.inputs;

    const user = await UserManager.updateOne({ id: token.id }, {
      email,
      fullName,
      username,
      profilePhoto
    });
    return mutator.get({ user });
  }
};

module.exports = UserProfileController;
