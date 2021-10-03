'use stric';
const paymentServices = require('../services/payment.services');

const doPayment = async(req, res) => {
  // eslint-disable-next-line no-unused-vars
  const pay = await paymentServices.doPayment(req, res);
}

module.exports = {
  doPayment,
}