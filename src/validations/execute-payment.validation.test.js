
describe('execute-payment validation schema', () => {
    it('should not return an error with valid query params', () => {
      const { executePaymenteSchema } = require('./execute-payment.validation');
      // http://localhost:3000/v1/execute-payment?token=0S289693ME502834F&PayerID=4CTYK2WVQUFQC
      const fields = {
        "token": "0S289693ME502834F&PayerID=4CTYK2WVQUFQC"
      }

      const {value, error} = executePaymenteSchema.validate(fields);
      console.log('ERROR ***', error)
      expect(error).toBeFalsy();
    });

    it('should return an error for no provider in body', () => {
        const { executePaymenteSchema } = require('./execute-payment.validation');
        const fields = {
            "token": ""
          }

        delete fields.provider;

        const {value, error} = executePaymenteSchema.validate(fields);
        expect(error).toBeDefined();
        expect(error.details[0].message).toBe('\"token\" is not allowed to be empty');
    });

})
