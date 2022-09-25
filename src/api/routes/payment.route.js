const express = require('express');
const paymentCtrl = require('../../controllers/payment.ctrl');
const { paymentSchemaValidator } = require('../middlewares/payment.validation');
const { executePaymenteSchemaValidator } = require('../middlewares/execute-payment.validation');

const app = express();

// app.get('/payment', paymentCtrl.paymentRoute);
app.post('/payment', paymentSchemaValidator, paymentCtrl.doPayment)
app.get('/execute-payment', executePaymenteSchemaValidator , paymentCtrl.executePayment);

module.exports = app;