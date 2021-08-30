module.exports = {
  get: ({ user }) => {
    return {
      code: user.code,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      companyName: user.companyName,
      phone: user.phone,
      confirmed: user.confirmed,
      registrationCompleted: user.registrationCompleted,
      status: user.status
    };
  }
};
