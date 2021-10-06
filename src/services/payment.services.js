'use strict';
const httpStatus = require('http-status');
const logger = require('../config/logger');
const config = require('../config/config');
const facadePaymentGateway = require('../facadePaymentGateway/facadePaymentGateway');

// const { provider, providerStatus } = config;
// const { currencies } = config.stripe;

const PAYPAL = 'paypal';

const buildPaymentInst = (data) => {

  let paymentData = {
    provider: data.provider,
    statusProvider: '1',
    description: (data.product) ? data.product.description: '',
    amount: (data.product) ? data.product.amount : '',
    quantity: (data.product) ? data.product.quantity : '',
    currency: (data.product) ? data.product.currency : '',
    paymentMethodTypes: [data.paymentMethodTypes  || ''],
    user: { ...data.user  || {} }
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

  const provider = req.body.provider;
  const paymentData = buildPaymentInst(req.body);
  const paymentGateway = new facadePaymentGateway(paymentData);
  paymentGateway.useProvider();

  let resultPayment;
  try {
    resultPayment = await paymentGateway.payment();
  } catch (error) {
    logger.error(error);
  }

  logger.info(`payment with provider: ${provider}`);
  if (provider === PAYPAL) {
    return {
      ok:true,
      paymentInfo: { ...resultPayment }
    };
  } else {
    logger.info(`payment status is: ${resultPayment.status}`)
    return (resultPayment.status === 'succeeded') ? 
      {
        ok: true,
        paymentInfo: resultPayment
      } 
      : {
        ok: false,
        paymentInfo: {
          message: 'can not process the payment'
        }
      }
  }
  
}

const executePayment = async(req, res) => {
  logger.info('execute payment from paypal provider');
  const token = req.query.token;
  const payerId = req.query.PayerID;

  if (!req.body.provider) {
    req.body.provider = PAYPAL;
  }
  const paymentData = buildPaymentInst(req.body);
  const paymentGateway = new facadePaymentGateway(paymentData);
  paymentGateway.useProvider();

  let executePayment; 
  try {
    executePayment = await paymentGateway.executePayment(token, payerId);
  } catch (error) {
    logger.error(error);
  }

  if ( executePayment && executePayment.status === 'COMPLETED') {

    return {
      ok:true, 
      paymentInfo: executePayment
    }
  } else {
    return { ok: false, paymentInfo: { message: `paymen can not be process`}}
  }

}

module.exports = {
  paymentRoute,
  executePayment,
  doPayment,
}