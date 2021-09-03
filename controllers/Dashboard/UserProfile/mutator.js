module.exports = {
  get: ({ user }) => {
    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        emailConfirmed: user.emailConfirmed,
        registrationCompleted: user.registrationCompleted,
        planCode: user.planCode,
        profilePhoto: user.profilePhoto
      },
    };
  }
};
