module.exports = {
  get: ({ user }) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      emailConfirmed: user.emailConfirmed,
      registrationCompleted: user.registrationCompleted,
      profilePhoto: user.profilePhoto
    };
  }
};
