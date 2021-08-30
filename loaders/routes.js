const express = require('express');

const configs = require('../configs');

module.exports = async (app) => {
  const serviceRoute = express.Router();
  serviceRoute.use('/healthcheck', require('../controllers/Healthcheck'));
  serviceRoute.use('/dashboard', require('../controllers/Dashboard'));

  app.use(configs.baseRoute, serviceRoute);
};
