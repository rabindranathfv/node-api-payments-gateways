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
    description: data.product.description,
    amount: data.product.amount,
    quantity: data.product.quantity,
    currency: data.product.currency,
    paymentMethodTypes: [data.paymentMethodTypes],
    user: { ...data.user }
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

  const paymentData = buildPaymentInst(req.body);
  const paymentGateway = new facadePaymentGateway(paymentData);
  paymentGateway.useProvider();

  let resultPayment;
  try {
    resultPayment = await paymentGateway.payment();
  } catch (error) {
    console.log(error);
  }

  logger.info(`payment with status: ${resultPayment.status}`)
  return {
    ok: true,
    paymentInfo: resultPayment
  };
}

module.exports = {
  paymentRoute,
  doPayment,
}