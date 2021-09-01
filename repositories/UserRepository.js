const _ = require('lodash');
const UserModel = require('../models/UserModel');
const Helper = require('../utils/helper');

const UserRepository = {
  upsert: async (email, { oneTimePassword }) => {
    const filter = {
      email
    };
    const update = {
      oneTimePassword: {
        code: oneTimePassword,
        createdAt: Helper.date.now(),
      }
    };
    const user = await UserModel.findOneAndUpdate(filter, update, { upsert: true, new: true });
    return user;
  },
  findOne: async ({
    email = null,
    id = null,
  }) => {
    const where = _.omitBy({
      email,
      _id: id
    }, _.isNil);

    return UserModel.findOne(where);
  },
  updateOne: async ({ id }, {
    emailConfirmed,
    registrationCompleted,
    fullName,
    username,
    profilePhoto,
    email,
  } = {}) => {
    const filter = {
      _id: id
    };
    const update = _.omitBy({
      emailConfirmed,
      registrationCompleted,
      fullName,
      username,
      profilePhoto,
      email
    }, _.isNil);
    const user = await UserModel.findOneAndUpdate(filter, update, { new: true });
    return user;
  }
};

module.exports = UserRepository;
