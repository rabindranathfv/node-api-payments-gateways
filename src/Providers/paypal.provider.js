const logger = require('../config/logger');
const config = require('../config/config');
const { secretKey, clientId, paypalUrl, currencies } = config.paypal;
const request = require('request');

const auth = { user: clientId, pass: secretKey };
const paypal = require('paypal-node-sdk');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': clientId,
  'client_secret': secretKey
});

class PaypalProvider {
  constructor(paypalInfo = {}) {
    const { paymentId, customerId, description, amount,
      quantity, currency, paymentMethodTypes, user } = paypalInfo;
    this.paymentMethodTypes = paymentMethodTypes;
    this.description = description;
    this.amount = amount;
    this.quantity = quantity;
    this.currency = currency;
    this.user = { ...user }
    this.paymentId = paymentId;
    this.customerId = customerId;
  }

  createPayment() {

    

  }

  async payment() {
    const body = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: this.currency,
          value: this.amount
        }
      }],
      application_context: {
        brand_name: 'Clickalia-paypal-integration.com',
        lading_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'http://localhost:3000/execute-payment',
        cancel_url: 'http://localhost:3000/cancel-payment'
      } 
    }
    let payment;
    request.post(`${paypalUrl}/v2/checkout/orders`, {
      auth,
      body,
      json: true,
    }, (err, response) => {
      console.log('response from PAYPAL', response.body);
      payment = { paymentInfo: response.body };
    })

    return payment;
  }

  partialReimburse() {
    return true;
  }
}

module.exports = PaypalProvider;

