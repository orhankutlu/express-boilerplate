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
      name,
      email,
      profilePhoto
    } = request.inputs;

    const user = await UserManager.updateOne({ id: token.id }, {
      email,
      name,
      username,
      profilePhoto
    });
    return mutator.get({ user });
  },

  completeRegistration: async (request, { locals }) => {
    const { username, name } = request.inputs;
    const { token: authToken } = locals;
    const { user, token } = await UserManager.completeRegistration({ id: authToken.id, username, name });
    return mutator.get({ user, token });
  },
};

module.exports = UserProfileController;
