const random = require('random-key');
const _ = require('lodash');
const dayjs = require('dayjs');
const UserModel = require('../models/UserModel');

const UserRepository = {
  findOne: async ({
    email = null,
    code = null,
  }) => {
    const where = _.omitBy({
      email,
      code
    }, _.isNil);

    return UserModel.findOne(where);
  },
  create: async ({
    email,
    firstName = null,
    lastName = null,
    confirmed = false,
    registrationCompleted = false,
    provider = 'local',
    authCode = null,
    meta = {}
  }) => {
    const code = `U-${random.generateBase30(8)}`;
    const data = {
      code,
      email,
      firstName,
      lastName,
      confirmed,
      registrationCompleted,
      auth: {
        code: authCode,
        provider,
        createdAt: dayjs()
      },
      meta
    };

    return UserModel.create(data);
  },

  update: (email, {
    firstName = null,
    lastName = null,
    confirmed = null,
    authCode = null,
    registrationCompleted = null,
    companyName = null,
    phoneNumber = null,
    status = null,
    provider = null,
    meta = null
  }) => {
    const data = _.omitBy({
      firstName,
      lastName,
      confirmed,
      registrationCompleted,
      companyName,
      status,
      meta
    }, _.isNil);

    if (authCode !== null) {
      data['auth.code'] = authCode;
      data['auth.createdAt'] = dayjs();
    }

    if (provider !== null) {
      data['auth.provider'] = provider;
    }

    if (phoneNumber !== null) {
      // @todo add international and national formats of the phone.
      data['phone.number'] = phoneNumber;
    }

    return UserModel.findOneAndUpdate({
      email
    }, {
      $set: data
    }, {
      new: true
    });
  },
  list: async ({ codes, ids }) => {
    const where = {};
    if (codes) {
      where.code = { $in: codes };
    }
    if (ids) {
      where._id = { $in: ids };
    }
    const users = await UserModel.find(where);
    return users;
  }
};

module.exports = UserRepository;
