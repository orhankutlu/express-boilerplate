module.exports = {
  allowedOrigins: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : '*',
  allowedMethods: (process.env.CORS_ALLOWED_METHODS || 'GET,POST,OPTIONS,PUT,DELETE').split(','),
  allowedHeaders: (process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization').split(',')
};
