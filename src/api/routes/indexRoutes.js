const express = require('express');

const app = express();

const VERSION_API = '/v1';
app.use(VERSION_API, require('./health.route'));
app.use(VERSION_API, require('./payment.route'));
app.use(VERSION_API, require('./reimburse.route'));

module.exports = app;
