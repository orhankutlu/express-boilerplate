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
  getOne: async ({ email }) => {
    const user = await UserRepository.findOne({ email });
    if (!user) {
      throw new ApplicationError({
        error: ErrorCodes.UserNotFound,
        meta: {
          email,
        }
      });
    }
    return user;
  },
  updateOne: async ({ id }, {
    emailConfirmed = null,
    registrationCompleted = null,
    fullName = null,
    username = null,
    profilePhoto = null
  } = {}) => {
    const user = await UserRepository.updateOne({ id }, {
      emailConfirmed,
      registrationCompleted,
      fullName,
      username,
      profilePhoto
    });
    return user;
  }
};

module.exports = UserManager;
