module.exports = {
  verify: ({ user, token }) => {
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
      token
    };
  }
};
