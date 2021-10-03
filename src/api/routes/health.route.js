const express = require('express');
const healthCtrl = require('../../controllers/health.ctrl');

const app = express();

app.get('/health', healthCtrl.getUsers);

module.exports = app;