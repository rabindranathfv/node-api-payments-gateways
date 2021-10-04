'use strict';
const httpStatus = require('http-status');
const logger = require('../config/logger');
const config = require('../config/config');
const facadePaymentGateway = require('../facadePaymentGateway/facadePaymentGateway');

const { provider, providerStatus } = config;
const { currencies } = config.stripe;

const buildPaymentInst = (data) => {
  let paymentData = {
    provider: 'stripe',
    statusProvider: '1',
    paymentId: data.paymentId,
    description: data.description,
    amount: data.amount,
    quantity: data.quantity,
    currency: data.currency,
    paymentMethodType: data.paymentMethodType
  };
    
  return paymentData;
}

const paymentRoute = async(req, res) => {
  logger.info('payment in progress');

  res.status(httpStatus.OK).send(
    {
      ok: true,
      message: `healty payment endpoint`,
    }
  );
}

const doPayment = async(req, res) => {
  logger.info('payment in progress');

  console.log('DATA FROM BODY***', req.body);
  const paymentData = buildPaymentInst(req.body);
  const paymentGateway = new facadePaymentGateway(paymentData);
  paymentGateway.useProvider();
  let resultPayment = paymentGateway.payment();

  console.log(resultPayment);

  res.status(httpStatus.OK).send(
    {
      ok: true,
      message: `payment successfuly`,
    }
  );
}

module.exports = {
  paymentRoute,
  doPayment,
}