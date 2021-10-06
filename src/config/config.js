/* eslint-disable no-undef */
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const logger = require('./logger');

dotenv.config({ path: path.join(__dirname, '../../.env') });

logger.info(`Enviroment running: ${process.env.NODE_ENV}`);

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    PROVIDERS: Joi.string().required(),
    PROVIDERS_STATUS: Joi.string().required(),
    CURRENCIES: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
    STRIPE_PUBLIC_KEY: Joi.string().required(),
    STRIPE_WEBHOOK_SECRET: Joi.string().required(),
    PAYPAL_CLIENT_ID: Joi.string().required(),
    PAYPAL_SECRET_KEY: Joi.string().required(),
    PAYPAL_URL: Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

let providers = envVars.PROVIDERS.split(',');
let providersStatus = envVars.PROVIDERS_STATUS.split(',');
let currencies = envVars.CURRENCIES.split(',');

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  providers,
  providersStatus,
  stripe: {
    currencies,
    secretKey: envVars.STRIPE_SECRET_KEY,
    publicKey: envVars.STRIPE_PUBLIC_KEY,
    webhookSecret: envVars.STRIPE_WEBHOOK_SECRET
  },
  paypal: {
    currencies,
    clientId: envVars.PAYPAL_CLIENT_ID,
    secretKey: envVars.PAYPAL_SECRET_KEY,
    paypalUrl: envVars.PAYPAL_URL
  }
};
