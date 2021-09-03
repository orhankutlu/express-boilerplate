const AuthManager = require('../../../business/AuthManager');
const UserManager = require('../../../business/UserManager');
const AuthMutator = require('./mutator');

const AuthController = {
  signin: async (request) => {
    const { email } = request.inputs;
    const resp = await AuthManager.signin(email);
    return resp;
  },
  verify: async (request) => {
    const { email, oneTimePassword } = request.inputs;
    const { user, token } = await AuthManager.verify(email, oneTimePassword);
    return AuthMutator.verify({ user, token });
  },
  checkUsername: async (request) => {
    const { username } = request.inputs;
    const usernameTaken = await UserManager.isUsernameTaken(username);
    return { usernameTaken };
  }
};

module.exports = AuthController;
