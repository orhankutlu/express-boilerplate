class ApplicationError extends Error {
  constructor({ error, message, meta }) {
    super(message);
    this.name = error.name;
    this.meta = meta;
    this.type = error.name;
    this.statusCode = error.httpCode || 400;
  }
}

module.exports = ApplicationError;
