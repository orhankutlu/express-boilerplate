const express = require('express');
const actionHandler = require('../../../handlers/actionHandler');
const middlewareHandler = require('../../../handlers/middlewareHandler');

const controller = require('./controller');
const validator = require('./validator');

const router = express.Router();

router.get(
  '/me',
  actionHandler(controller.get)
);

router.put(
  '/me',
  middlewareHandler(validator.update),
  actionHandler(controller.update)
);

module.exports = router;
