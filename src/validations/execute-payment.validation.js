const Joi = require('joi');

const executePaymenteSchema = Joi.object({
  token: Joi.string().required()
});

module.exports = {
  executePaymenteSchema
};
