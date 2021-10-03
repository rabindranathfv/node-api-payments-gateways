/* eslint-disable no-undef */
const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log('config dirname***', path.join(__dirname, '../.env'))

console.log(process.env.NODE_ENV, process.env.MONGODB_URL, process.env.port, process.env.PROVIDERS)

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    PROVIDERS: Joi.string().required(),
    PROVIDERS_STATUS: Joi.string().required()
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

let providers = envVars.PROVIDERS.split(',')
let providers_status = envVars.PROVIDERS_STATUS.split(',')

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
  providers_status
};
