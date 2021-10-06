const Joi = require('joi');

const paymentSchema = Joi.object({
  user: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
  }),
  product: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    amount: Joi.number().required(),
    quantity: Joi.number().required(),
    currency: Joi.string().required()
  }),
  paymentMethodTypes: Joi.string().required().valid('card'),
  provider: Joi.string().required().valid('stripe', 'paypal')

});

module.exports = {
  paymentSchema
};
