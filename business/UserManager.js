const UserRepository = require('../repositories/UserRepository');
const Publisher = require('../utils/publisher');
const ApplicationError = require('../ApplicationError');
const ErrorCodes = require('../ErrorCodes');

const UserManager = {
  upsert: async (email, { oneTimePassword }) => {
    const user = await UserRepository.upsert(email, { oneTimePassword });

    await Publisher.fire({
      event: Publisher.events.USER_SIGN_IN,
      message: {
        user
      }
    });

    return user;
  },
  getOne: async ({ email, id }) => {
    const user = await UserRepository.findOne({ email, id });
    if (!user) {
      throw new ApplicationError({
        error: ErrorCodes.UserNotFound,
        meta: {
          email,
          id
        }
      });
    }
    return user;
  },
  updateOne: async ({ id }, {
    emailConfirmed,
    registrationCompleted,
    name,
    username,
    profilePhoto,
    email,
  } = {}) => {
    const user = await UserRepository.updateOne({ id }, {
      emailConfirmed,
      registrationCompleted,
      name,
      username,
      profilePhoto,
      email,
    });
    return user;
  },
  isUsernameTaken: async (username) => {
    const user = await UserRepository.findOne({ username });
    return !!user;
  },

  completeRegistration: async ({ id, username, name }) => {
    let user = await UserManager.getOne({ id });
    if (user.registrationCompleted) {
      throw new ApplicationError({
        error: ErrorCodes.UserAlreadyRegistered,
        meta: {
          userId: id
        }
      });
    }
    const AuthManager = require('./AuthManager');
    if (await UserManager.isUsernameTaken(username)) {
      throw new ApplicationError({
        error: ErrorCodes.UsernameTaken,
        meta: {
          username
        }
      });
    }
    user = await UserManager.updateOne({ id }, {
      registrationCompleted: true,
      name,
      username
    });
    const token = await AuthManager.generateToken(user);
    return { token, user };
  },
};

module.exports = UserManager;
