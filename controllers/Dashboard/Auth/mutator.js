module.exports = {
  verify: ({ user, token }) => {
    return {
      user: {
        code: user.code,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        confirmed: user.confirmed,
        registrationCompleted: user.registrationCompleted,
        status: user.status,
      },
      token
    };
  }
};
