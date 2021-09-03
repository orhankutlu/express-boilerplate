const Joi = require('joi');
const configs = require('../../../configs');
const { isValid } = require('../../../middlewares');

module.exports = {
  update: isValid(Joi.object().keys({
    username: Joi.string().trim().lowercase().max(100)
      .regex(configs.business.user.usernameRegex)
      .optional(),
    name: Joi.string().trim().max(100).optional(),
    email: Joi.string().trim().lowercase().email({ minDomainSegments: 2 }),
    profilePhoto: Joi.string().trim().max(100).optional(),
  })),
  completeRegistration: isValid(Joi.object().keys({
    username: Joi.string().trim().lowercase(),
    name: Joi.string().trim().required()
  }).required()),
};
