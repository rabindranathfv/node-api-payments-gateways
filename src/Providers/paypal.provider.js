const logger = require('../config/logger');
const config = require('../config/config');
const { secretKey, clientId, paypalUrl, currencies } = config.paypal;
const axios = require('axios');
const { executePayment } = require('../services/payment.services');

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

  async getPayPalAccessToken() {
    const options = {
      url: `${paypalUrl}/v1/oauth2/token`,
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Accept-Language": "en_US",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: clientId,
        password: secretKey,
      },
      params: {
        grant_type: 'client_credentials',
      },
    };
    const { data } = await axios(options);
    return data.access_token;
  }

  async payment() {
    let token = await this.getPayPalAccessToken();

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
        return_url: 'http://localhost:3000/v1/execute-payment',
        cancel_url: 'http://localhost:3000/v1/cancel-payment'
      } 
    }
    let payment;

    const options = {
      method: 'POST',
      url: `${paypalUrl}/v2/checkout/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      data: body
    };
    const { status, data } = await axios(options);
    payment = { ...data};

    return payment;
  }

  async executePayment(token) {
    let tokenAccess = await this.getPayPalAccessToken();

    const options = {
      method: 'POST',
      url: `${paypalUrl}/v2/checkout/orders/${token}/capture`,
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
        Accept: 'application/json',
      },
      data: { }
    };
    const { status, data } = await axios(options);
    let executePaymentData = { ...data};
    return executePaymentData;
  }

  partialReimburse() {
    return true;
  }
}

module.exports = PaypalProvider;

