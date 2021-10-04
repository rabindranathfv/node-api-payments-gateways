'use strict';
const httpStatus = require('http-status');
const logger = require('../config/logger');

const facadePaymentGateway = require('../facadePaymentGateway/facadePaymentGateway');

const doPayment = async(req, res) => {
  logger.info('payment in progress');

  const paymentGateway = new facadePaymentGateway('stripe', '1', 'payment-id-test');
  console.log('Using facede patther with stripe class***', paymentGateway.checkPaymentByProvider());

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