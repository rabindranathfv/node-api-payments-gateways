const Stripe = require('../Providers/stripe.provider');
const logger = require('../config/logger');

const BRAINTREE = 'braintree';
class PaymentGatewayFacade {
  constructor(paymentGatewayInfo = {}) {
    const { provider, statusProvider, description,
      amount, quantity, currency,
      paymentMethodTypes , user 
    } = paymentGatewayInfo;
    this.provider = provider;
    this.statusProvider = statusProvider;
    this.description = description;
    this.amount = amount;
    this.quantity = quantity;
    this.currency = currency;
    this.paymentMethodTypes = [ ...paymentMethodTypes];
    this.user = { ...user };
    this.customerId = null;
    this.paymentProvider = null;
  }

  getStripeObject() {
    return { customerId: this.customerId,
      description: this.description, 
      amount: this.amount, 
      quantity: this.quantity, 
      currency: this.currency, 
      paymentMethodTypes: [ ...this.paymentMethodTypes],
      user: this.user
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

  checkPaymentByProvider() {
    return this.stripePayment.checkPayment() + ' the provider is ' + this.provider;
  }

}

module.exports = PaymentGatewayFacade;