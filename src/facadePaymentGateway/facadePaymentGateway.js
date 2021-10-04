const Stripe = require('../Providers/stripe.provider');

class PaymentGatewayFacade {
  constructor(provider, status_provider, paymentId) {
    this.provider = provider;
    this.status_provider = status_provider;
    this.paymentId = paymentId;
    this.stripePayment = new Stripe(this.paymentId);;
  }

  doPaymentId() {
    return this.paymentId;
  }

  doReimburse() {
    return this.paymentId;
  }

  checkPaymentByProvider() {
    return this.stripePayment.checkPayment() + ' the provider is ' + this.provider;
  }

}

module.exports = PaymentGatewayFacade;