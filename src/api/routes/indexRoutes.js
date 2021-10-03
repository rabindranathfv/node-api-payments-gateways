const express = require('express');

const app = express();

app.use('/v1', require('./health.route'));
app.use('/v1', require('./users.route'));

module.exports = app;
