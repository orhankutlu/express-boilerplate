module.exports = {
  secret: process.env.AUTH_SECRET,
  oneTimePasswordLength: process.env.AUTH_CODE_LENGTH || 6,
  oneTimePasswordExpiresInMinutes: process.env.AUTH_CODE_EXPIRES_IN_MINUTES || 5
};
