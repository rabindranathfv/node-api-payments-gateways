const logger = require('../../config/logger');
const { executePaymenteSchema } = require('../../validations/execute-payment.validation');
const httpStatus = require('http-status');

const executePaymenteSchemaValidator = (req, res, next) => {
  logger.info('checking query params for execute-payment validation');
  const { value , error } = executePaymenteSchema.validate(req.body);

  if (error) {
    logger.info('the body has errors', error.details[0].message);
    return res.status(httpStatus.BAD_REQUEST).send({ ok: false, message:`query params validation error -> ${error.details[0].message}`});
  }

  logger.info('query params matched with schema');
  return next();
}

module.exports = {
  executePaymenteSchemaValidator
}