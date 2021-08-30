const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const ApplicationError = require('./ApplicationError');
const ErrorCodes = require('./ErrorCodes');
const config = require('./configs');
const logger = require('./utils/logger');
const middlewareHandler = require('./handlers/middlewareHandler');
const { requestLogger, responseHelpers } = require('./middlewares');
const loaders = require('./loaders');

const makeApp = async () => {
  const app = express();
  app.use(middlewareHandler(responseHelpers));
  app.use(helmet());
  app.use(cors({
    origin: config.cors.allowedOrigins,
    methods: config.cors.allowedMethods,
    allowedHeaders: config.cors.allowedHeaders
  }));
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(middlewareHandler(requestLogger));

  await loaders(app);

  app.use((req, res, next) => {
    const err = new ApplicationError({
      error: ErrorCodes.NotFound,
    });
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = config.env !== 'production' ? err : {};

    logger.error(err.message, {
      statusCode: err.statusCode,
      stack: err.stack,
      meta: err.meta,
      type: err.type || 'ERROR'
    });

    return res.error({
      message: err.message,
      type: err.type || 'ERROR',
      meta: err.meta,
      stack: config.env !== 'production' ? err.stack : undefined,
    }, err.statusCode);
  });

  return app;
};

module.exports.makeApp = makeApp;
