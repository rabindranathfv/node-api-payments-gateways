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

const config = require('../config/config');

class Stripe {
  constructor(paymentId) {
    this.paymentId = paymentId;
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

module.exports = Stripe;

