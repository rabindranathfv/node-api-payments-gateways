# RESTful API Node Payment Gateway - Boilerplate Node

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose.

By running a single command, you will get a production-ready Node.js app installed and fully configured on your machine. The app comes with many built-in features, request validation, unit and integration tests, continuous integration, docker support, API documentation, pagination, etc. For more details, check the features list below.

## Quick Start

To create a project, simply run:

```bash
npx create-nodejs-express-app <project-name>
```

Or

```bash
npm init nodejs-express-app <project-name>
```

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the project from

```bash
 git clone https://github.com/rabindranathfv/node-api-payments-gateways.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Error Handling](#error-handling)
- [Validation](#validation)
- [Logging](#logging)
- [Linting](#linting)
- [Solutions](#solutions)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Error handling**: centralized error handling mechanism
- **Dependency management**: with [npm](https://npmpkg.com)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Code coverage**: using [coveralls](https://coveralls.io)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)

## Commands

Running locally:

```bash
npm run start-dev
```

Running in production:

```bash
npm run start-production
```

Testing:

```bash
# run all tests
npm run test

# run test coverage
npm test-coverage
```

Linting:

```bash
# run ESLint
npm lint

# fix ESLint errors
npm lint-fix


## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-api-payments-gateways

# node env
NODE_ENV = development

# providers 
PROVIDERS = stripe,paypal,t2

# providers status, use to activate o deactivate a payment provider
PROVIDERS_STATUS = 1,0,1

# currencies
CURRENCIES = USD,EUR,CLP

# STRIPE_VARIABLES
STRIPE_SECRET_KEY = stripe-secret-key
STRIPE_PUBLIC_KEY = stripe-public-key
STRIPE_WEBHOOK_SECRET = stripe-webhook-secret
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration, loggers, headers and related things
 |--controllers\    # Route controllers (controller layer)
 |--api\            # routing and middlewares
 |--facadePaymentGateway\    # Facade software patter for multi payment methods
 |--models\         # Mongoose models (data layer)
 |--Providers\      # payment Providers
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--app.js          # Express app
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**User routes**:\
`GET /v1/health` - health services for running app\
`POST /v1/payment` - payment process for multiple provider\
`GET /v1/reimburse` - reimburse process for multiple provider\

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware. For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require('../utils/catchAsync');

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error('Something wrong happened');
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const facadePaymentGateway = require('../facadePaymentGateway/facadePaymentGateway');

const getPaymentById = async (paymentId) => {
  const paymentGateway = new facadePaymentGateway(paymentData);
  const payment = await paymentGateway.payment();
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'payment not found');
  }
};
```

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas. 

## Logging

Import the logger from `src/config/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```javascript
const logger = require('<path to src>/config/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```

In development mode, log messages of all severity levels will be printed to the console.

In production mode, only `info`, `warn`, and `error` logs will be printed to the console

Note: API request information (request url, response code, timestamp, etc.) are also automatically logged (using [morgan](https://github.com/expressjs/morgan)).


## Linting

Linting is done using [ESLint](https://eslint.org/).

In this app, use ESLint recomended config

To modify the ESLint configuration, update the `.eslintrc.json` file. 

To prevent a certain file or directory from being linted, add it to `.eslintignore`.

## Solutions

for the actual challenge i can think in 4 diferentes solutions based on software design patterns and architecture layers patterns.

+ solution n°1

first solution is based on a layered pattern for monolithic API in nodeJs which implements a Facade software design patter for abstration for all providers. we are going to consume Facade and inside it we are going to have severals methods (public and private) for use an specific payment gateway provider (stripe, braintree, etc). 

i decide to divided in specific layers start for presentation layer with routes jump into controlers & services and consume this facade pattern in each service. the most important of this is you can use any provider because facade absorb all those responsability and you are going to have just one way to consume any payment provider. Aditionally based on configuration you can active or deactive any of those provider using an specfic enviroment variables in `.env`.

![LayeredPatter](https://blog.ndepend.com/wp-content/uploads/layered-1.png)

![Facade](/readmeImg/Example_of_Facade_design_pattern_in_UML.png)

## License

[MIT](LICENSE)
