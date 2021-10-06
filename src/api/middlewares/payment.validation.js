const logger = require('../../config/logger');
const { paymentSchema } = require('../../validations/payment.validation');
const httpStatus = require('http-status');

const paymentSchemaValidator = (req, res, next) => {
  logger.info('checking body payment validation');
  const { value , error } = paymentSchema.validate(req.body);

  if (error) {
    logger.info('the body has errors', error.details[0].message);
    return res.status(httpStatus.BAD_REQUEST).send({ ok: false, message:`body validation error -> ${error.details[0].message}`});
  }

  logger.info('body matched with schema');
  return next();
}

module.exports = {
  paymentSchemaValidator
}