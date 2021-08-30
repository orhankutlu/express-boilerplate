
const { expect } = require('@jest/globals');
const UserProfileManager = require('../../../../business/UserProfileManager');

const mocker = require('../../../mock');

describe('Check methods Dashboard/UserProfileController ', () => {
  const UserProfileController = require('../../../../controllers/Dashboard/UserProfile/controller');
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test('GET /users/me', async () => {
    const req = mocker.mockRequest();
    const res = mocker.mockResponse();

    const email = 'test@testmail.com';

    res.locals = {
      token: {
        user: {
          email
        }
      }
    };
    const user = {
      code: 'U-TEST',
      email: 'test@testmail',
      firstName: 'test',
      lastName: 'test',
      companyName: 'test',
      phone: '5444444444',
      confirmed: true,
      registrationCompleted: true,
    };
    jest.spyOn(UserProfileManager, 'get').mockReturnValue(user);

    const resp = await UserProfileController.get(req, res);
    expect(UserProfileManager.get).toBeCalledWith(email);
    expect(resp).toMatchObject({
      code: user.code,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      confirmed: user.confirmed,
      registrationCompleted: user.registrationCompleted,
    });
  });


  test('PUT /users/me', async () => {
    const req = mocker.mockRequest();
    const res = mocker.mockResponse();
    const email = 'test@testmail.com';

    res.locals = {
      token: {
        user: {
          email
        }
      }
    };

    req.inputs = {
      firstName: 'firstName',
      lastName: 'lastName',
      registrationCompleted: true
    };

    const data = {
      firstName: 'firstName',
      lastName: 'lastName'
    };

    jest.spyOn(UserProfileManager, 'update').mockReturnValue(data);

    await UserProfileController.update(req, res);
    expect(UserProfileManager.update).toBeCalledWith(email, expect.objectContaining({
      ...(req.inputs)
    }));
  });
});
