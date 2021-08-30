const { expect } = require('@jest/globals');

const UserRepository = require('../../../repositories/UserRepository');
const UserManager = require('../../../business/UserManager');
const UserProfileManager = require('../../../business/UserProfileManager');
const configs = require('../../../configs');

describe('Check methods UserProfileManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.restoreAllMocks();
  });



  test('UserProfileManager.update:: should update profile details', async () => {
    const email = 'test@testemail.com';

    const data = {
      firstName: 'firstName',
      lastName: 'lastName',
      registrationCompleted: true,
      phoneNumber: '+9055555555555',
      companyName: 'testCompany',
      status: {}
    };

    jest.spyOn(UserManager, 'update').mockReturnValue(data);
    const resp = await UserProfileManager.update(email, data);

    expect(resp).toMatchObject(data);
    expect(UserManager.update).toHaveBeenCalledTimes(1);
    expect(UserManager.update).toBeCalledWith(email, {
      firstName: data.firstName,
      lastName: data.lastName,
      registrationCompleted: data.registrationCompleted,
      companyName: data.companyName,
      phoneNumber: data.phoneNumber,
      status: data.status
    });
  });

});
