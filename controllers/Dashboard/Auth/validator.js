const Joi = require('joi');
const configs = require('../../../configs');
const { isValid } = require('../../../middlewares');

module.exports = {
  signin: isValid(Joi.object().keys({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
      .required()
  }).required()),
  verify: isValid(Joi.object().keys({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
      .required(),
    oneTimePassword: Joi.string().trim().required()
  }).required()),
  checkUsername: isValid(Joi.object().keys({
    username: Joi.string().trim().lowercase().max(configs.business.user.usernameMax)
      .regex(configs.business.user.usernameRegex)
      .required(),
    oneTimePassword: Joi.string().trim().required()
  }).required()),
};
