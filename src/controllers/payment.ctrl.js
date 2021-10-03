'use stric';
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const paymentServices = require('../services/payment.services');

const doPayment = catchAsync(async(req, res) => {
  // eslint-disable-next-line no-unused-vars
  const pay = await paymentServices.doPayment(req, res);
})

module.exports = {
  doPayment,
}