const express = require('express');
const paymentCtrl = require('../../controllers/payment.ctrl');

const app = express();

app.get('/payment', paymentCtrl.doPayment);

module.exports = app;