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

class StripeProvider {
  constructor(stripeInfo = {}) {
    const { paymentId, description, amount, quantity, currency, paymentMethodTypes } = stripeInfo;
    this.paymentId = paymentId;
    this.paymentMethodTypes = paymentMethodTypes;
    this.description = description;
    this.amount = amount;
    this.quantity = quantity;
    this.currency = currency;
  }

  async payment() {
    const session = await stripeConnection.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: this.currency,
            product_data: {
              name: this.productName
            },
            unit_amount: this.amount
          },
          // TODO: replace this with the `price` of the product you want to sell
          price: this.paymentId,
          quantity: this.quantity,
        },
      ],
      payment_method_types: [
        this.paymentMethodTypes,
      ],
      mode: 'payment'
    });

    logger.info('Stripe payment info', session);

    return session;
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

