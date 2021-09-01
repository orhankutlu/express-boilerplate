const Joi = require('joi');
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
};
