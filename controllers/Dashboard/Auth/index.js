const express = require('express');

const actionHandler = require('../../../handlers/actionHandler');
const middlewareHandler = require('../../../handlers/middlewareHandler');


const controller = require('./controller');
const validator = require('./validator');

const router = express.Router();

router.post(
  '/user/local/signin',
  middlewareHandler(validator.signin),
  actionHandler(controller.signin)
);

router.post(
  '/user/local/verify',
  middlewareHandler(validator.verify),
  actionHandler(controller.verify)
);

router.post(
  '/user/local/check-username',
  middlewareHandler(validator.checkUsername),
  actionHandler(controller.checkUsername)
);

module.exports = router;
