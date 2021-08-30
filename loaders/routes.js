const express = require('express');

const configs = require('../configs');

module.exports = async (app) => {
  const orgServiceRoute = express.Router();
  orgServiceRoute.use('/healthcheck', require('../controllers/Healthcheck'));
  orgServiceRoute.use('/dashboard', require('../controllers/Dashboard'));

  app.use(`/${configs.baseRoute}`, orgServiceRoute);
};
