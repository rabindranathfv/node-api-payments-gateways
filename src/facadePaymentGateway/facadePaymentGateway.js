const Stripe = require('../Providers/stripe.provider');
const logger = require('../config/logger');

const BRAINTREE = 'braintree';
class PaymentGatewayFacade {
  constructor(paymentGatewayInfo = {}) {
    const { provider, statusProvider, description,
      amount, quantity, currency,
      paymentMethodTypes , user 
    } = paymentGatewayInfo;
    console.log('facede instance***', paymentGatewayInfo);
    this.provider = provider;
    this.statusProvider = statusProvider;
    this.description = description;
    this.amount = amount;
    this.quantity = quantity;
    this.currency = currency;
    this.paymentMethodTypes = [ ...paymentMethodTypes];
    this.user = { ...user };
    this.customerId = null;
    this.paymentId = null;
    this.paymentProvider = null;
  }

  getStripeObject() {
    return { 
      description: this.description, 
      amount: this.amount, 
      quantity: this.quantity, 
      currency: this.currency, 
      paymentMethodTypes: [ ...this.paymentMethodTypes],
      user: this.user,
      customerId: this.customerId,
      paymentId: this.paymentId,
    };
  }

  getBraintreeObject() {
    return {};
  }

  useProvider(  ) {
    let paymentInfo = {};
    logger.info(`use Provider: ${this.provider}`)
    switch (this.provider) {
    case BRAINTREE:
      paymentInfo = { ...this.getBraintreeObject() };
      // import BRAINTREE provider
      // eslint-disable-next-line no-undef
      this.paymentProvider = new Braintree(paymentInfo);
      break;
    default:
      paymentInfo = { ...this.getStripeObject() };
      this.paymentProvider = new Stripe(paymentInfo);
      break;
    }
  }

  async payment() {
    return await this.paymentProvider.payment();
  }

  reimburse() {
    return this.paymentId;
  }


}

module.exports = PaymentGatewayFacade;