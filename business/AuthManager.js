const Helper = require('../utils/helper');
const Publisher = require('../utils/publisher');
const configs = require('../configs');
const ApplicationError = require('../ApplicationError');
const ErrorCodes = require('../ErrorCodes');
const UserManager = require('./UserManager');
const TokenManager = require('../utils/tokenManager');

const AuthManager = {
  signin: async (email) => {
    const oneTimePassword = Helper.generateRandomNumber(configs.auth.oneTimePasswordLength);
    const user = await UserManager.upsert(email, { oneTimePassword });

    await Publisher.fire({
      event: Publisher.events.USER_SIGN_IN,
      message: {
        user
      }
    });

    if (configs.env !== 'production') {
      return { oneTimePassword: user.oneTimePassword.code };
    }
    return true;
  },
  verify: async (email, oneTimePassword) => {
    let user = await UserManager.getOne({ email });
    if (user.oneTimePassword.code !== oneTimePassword || !Helper.date.hasPassed({
      date: user.oneTimePassword.createdAt,
      duration: configs.auth.oneTimePasswordExpiresInMinutes
    })) {
      throw new ApplicationError({
        error: ErrorCodes.InvalidUserVerificationCode,
        meta: {
          email,
          oneTimePassword
        }
      });
    }
    if (!user.confirmed) {
      user = await UserManager.updateOne(user.id, {
        emailConfirmed: true,
        oneTimePassword
      });
    }
    const token = await AuthManager.generateToken(user);
    return {
      user,
      token
    };
  },
  generateToken: async (user) => {
    const token = await TokenManager.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      registrationCompleted: user.registrationCompleted,
      profilePhoto: user.profilePhoto,
      planCode: user.planCode,
      scopes: ['user']
    });
    return token;
  },
};

module.exports = AuthManager;
