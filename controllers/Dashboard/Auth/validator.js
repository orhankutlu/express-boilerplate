const Joi = require('joi');
const { isValid } = require('../../../middlewares');

module.exports = {
  signin: isValid(Joi.object().keys({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
      .required()
  }).required()),
  resend: isValid(Joi.object().keys({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
      .required()
  }).required()),
  verify: isValid(Joi.object().keys({
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 })
      .required(),
    code: Joi.string().trim().required()
  }).required()),
  singleSignOn: isValid(Joi.object().keys({
    token: Joi.string().required(),
    provider: Joi.string().regex(/^[a-zA-z0-9-]+$/).required(),
    customParams: Joi.object().keys({
      showSubscriptionModal: Joi.boolean().optional()
    }).unknown().optional()
  }).required()),
};
