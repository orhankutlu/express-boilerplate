module.exports = {
  secret: process.env.AUTH_SECRET,
  authCodeLength: process.env.AUTH_CODE_LENGTH || 6,
  authCodeExpiresInMinutes: process.env.AUTH_CODE_EXPIRES_IN_MINUTES || 5
};
