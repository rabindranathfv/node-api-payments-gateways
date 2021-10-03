'use strict';
const httpStatus = require('http-status');
const logger = require('../config/logger');

const doPayment = async(req, res) => {
  logger.info('payment in progress');

  res.status(httpStatus.OK).send(
    {
      ok: true,
      message: `payment successfuly`,
    }
  );
}

module.exports = {
  doPayment,
}