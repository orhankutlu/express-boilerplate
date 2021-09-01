module.exports = {
  get: ({ user }) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      emailConfirmed: user.emailConfirmed,
      registrationCompleted: user.registrationCompleted,
      profilePhoto: user.profilePhoto
    };
  }
};
