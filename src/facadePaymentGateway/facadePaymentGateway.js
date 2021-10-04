const Stripe = require('../Providers/stripe.provider');

const BRAINTREE = 'braintree';
class PaymentGatewayFacade {
  constructor(paymentGatewayInfo = {}) {
    const { provider, statusProvider, paymentId,
      description, amount, quantity, 
      currency, paymentMethodTypes 
    } = paymentGatewayInfo;
    this.provider = provider;
    this.statusProvider = statusProvider;
    this.paymentId = paymentId;
    this.description = description;
    this.amount = amount;
    this.quantity = quantity;
    this.currency = currency;
    this.paymentMethodTypes = paymentMethodTypes;
    this.paymentProvider = null;
  }

  getStripeObject() {
    return { paymentId: this.paymentId,
      description: this.description, 
      amount: this.amount, 
      quantity: this.quantity, 
      currency: this.currency, 
      paymentMethodTypes: this.paymentMethodTypes
    };
  }

  getBraintreeObject() {
    return {};
  }

  useProvider(  ) {
    let paymentInfo = {};
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
    
    return this.paymentProvider;
  }

  payment() {
    this.paymentProvider.payment();
  }

  reimburse() {
    return this.paymentId;
  }

  checkPaymentByProvider() {
    return this.stripePayment.checkPayment() + ' the provider is ' + this.provider;
  }

}

module.exports = PaymentGatewayFacade;