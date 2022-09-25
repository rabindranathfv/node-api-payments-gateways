
describe('payment validation schema', () => {
    it('should not return an error with valid body', () => {
      const { paymentSchema } = require('./payment.validation');
      const fields = {
        "user": {
            "email": "rabin31@gmail.com",
            "name": "Rabindranath Ferreira"
        },
        "product": {
            "name": "hdd",
            "description": "hdd 256GB",
            "amount": 31,
            "quantity": 1,
            "currency": "USD"
        },
        "paymentMethodTypes": "card",
        "provider": "stripe"
      }

      const {value, error} = paymentSchema.validate(fields);
      console.log('ERROR ***', error)
      expect(error).toBeFalsy();
    });

    it('should return an error for no provider in body', () => {
        const { paymentSchema } = require('./payment.validation');
        const fields = {
          "user": {
              "email": "rabin31@gmail.com",
              "name": "Rabindranath Ferreira"
          },
          "product": {
              "name": "hdd",
              "description": "hdd 256GB",
              "amount": 31,
              "quantity": 1,
              "currency": "USD"
          },
          "paymentMethodTypes": "card",
          "provider": "stripe"
        }

        delete fields.provider;

        const {value, error} = paymentSchema.validate(fields);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe('"provider" is required');
    });

})
