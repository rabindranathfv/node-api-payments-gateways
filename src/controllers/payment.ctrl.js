'use stric';
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const paymentServices = require('../services/payment.services');

const paymentRoute = catchAsync(async(req, res) => {
  // eslint-disable-next-line no-unused-vars
  const pay = await paymentServices.paymentRoute(req, res);
});

const doPayment = catchAsync(async(req, res) => {
  const payment = await paymentServices.doPayment(req, res);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'payment failed');
  }
  res.status(httpStatus.OK).send(payment);
})

module.exports = {
  paymentRoute,
  doPayment,
}