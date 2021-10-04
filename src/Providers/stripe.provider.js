// {
//     "description": "Card payment",
//     "secretKey": "sk_test_this_is_not_real",
//     "publicKey": "pk_test_this_is_not_real",
//     "stripeCurrency": "usd", The Stripe currency to charge in
//     "stripeDescription": "expressCart payment", // Shows as the Stripe description
//     "stripeLogoURL": "http://localhost:1111/images/stripelogo.png" // URL to the logo to display on Stripe form
//     "stripeWebhookSecret": "whsec_this_is_not_real"
// }

// Note: The secretKey, publicKey and stripeWebhookSecret is obtained from your Stripe account dashboard.

const logger = require('../config/logger');
const config = require('../config/config');
const { secretKey } = config.stripe;

const Stripe = require('stripe');
const stripeConnection = new Stripe(secretKey);

const PAYMENT_METHOD = 'pm_card_visa';

class StripeProvider {
  constructor(stripeInfo = {}) {
    const { paymentId, description, amount, quantity, currency, paymentMethodTypes, user } = stripeInfo;
    this.paymentId = paymentId;
    this.paymentMethodTypes = paymentMethodTypes;
    this.description = description;
    this.amount = amount;
    this.quantity = quantity;
    this.currency = currency;
    this.user = { ...user }
  }

  setUpdatePaymentId(id) {
    this.paymentId = id;
  }

  async registerCustomer() {
    const { name, email } = this.user;
    let customer;
    try {
      customer = await stripeConnection.customers.create({
        email,
        name,
        payment_method: PAYMENT_METHOD,
        invoice_settings : {
          default_payment_method: PAYMENT_METHOD
        }
      });
    } catch (error) {
      console.log(error)
    }
    
    return customer;
  }

  async createPaymentMethod() {
    let paymentMethod;
    
    try {
      paymentMethod = await stripeConnection.createPaymentMethod({
        type: this.paymentMethodTypes,
        // card: cardElement,
        billing_details: {
          name: this.user.name,
        },
      })
    } catch (error) {
      console.log(error);
    }
    
    return paymentMethod
  }

  async confirmPayment() {
    let confirm;
    try {
      confirm = await stripeConnection.paymentIntents.confirm(this.paymentId, { payment_method: PAYMENT_METHOD });
    } catch (error) {
      console.log(error)
    }

    return confirm;
  }

  async payment() {

    const { id } = await this.registerCustomer();

    let paymentIntent;

    try {
      paymentIntent = await stripeConnection.paymentIntents.create({
        amount: 105,
        currency: 'usd',
        payment_method_types: this.paymentMethodTypes,
        customer: id,
      });
    } catch (error) {
      console.log(error)
    }
    
    this.setUpdatePaymentId(paymentIntent.id);
    let confirm = await this.confirmPayment();
    
    let confirmResults = {
      customerId: paymentIntent.id,
      paymentId: confirm.id,
      amount: confirm.amount,
      created: confirm.created,
      currency: confirm.currency,
      status: confirm.status,
    }
    
    return confirmResults;
  }

  connectingStripe() {
    return 'already connecting with stripe'
  }

  checkPayment() {
    return `we are checking the payment ${this.paymentId}`
  }

  partialReimburse() {
    return true;
  }
}

module.exports = StripeProvider;

