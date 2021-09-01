const AuthManager = require('../../../business/AuthManager');
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
};

module.exports = AuthController;
