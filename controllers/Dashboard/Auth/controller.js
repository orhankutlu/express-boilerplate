const UserManager = require('../../../business/UserManager');
const AuthMutator = require('./mutator');

const AuthController = {
  signin: async (request) => {
    const { email } = request.inputs;
    const resp = await UserManager.signin(email);
    return resp;
  },
  verify: async (request) => {
    const { email, code } = request.inputs;
    const { user, token } = await UserManager.verify(email, code);
    return AuthMutator.verify({ user, token });
  },
  resend: async (request) => {
    const { email } = request.inputs;
    const resp = await UserManager.signin(email);
    return resp;
  },
};

module.exports = AuthController;
