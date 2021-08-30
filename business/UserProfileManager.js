const UserRepository = require('../repositories/UserRepository');
const UserManager = require('./UserManager');

const UserProfileManager = {
  get: async (email) => {
    const user = await UserRepository.findOne({ email });
    return user;
  },
  update: async (email, {
    firstName = null,
    lastName = null,
    registrationCompleted = null,
    companyName = null,
    phoneNumber = null,
    status = null
  }) => {
    const user = await UserManager.update(email, {
      firstName,
      lastName,
      registrationCompleted,
      companyName,
      phoneNumber,
      status
    });

    return user;
  }
};

module.exports = UserProfileManager;
