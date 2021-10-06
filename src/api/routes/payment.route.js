const express = require('express');
const paymentCtrl = require('../../controllers/payment.ctrl');

const app = express();

app.get('/payment', paymentCtrl.paymentRoute);
app.post('/payment', paymentCtrl.doPayment)
app.get('/execute-payment', paymentCtrl.executePayment);

module.exports = app;