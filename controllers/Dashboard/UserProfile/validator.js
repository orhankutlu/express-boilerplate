const Joi = require('joi');
const { isValid } = require('../../../middlewares');

module.exports = {
  update: isValid(Joi.object().keys({
    firstName: Joi.string().trim().max(100).optional(),
    lastName: Joi.string().trim().max(100).optional(),
    companyName: Joi.string().trim().max(100).optional(),
    phoneNumber: Joi.string().trim().optional(),
    registrationCompleted: Joi.boolean().optional(),
    status: Joi.object().keys({
      hasWalkedThrough: Joi.boolean().optional()
    }).optional()
  }))
};
