const express = require('express');
const reimburseCtrl = require('../../controllers/reimburse.ctrl');

const app = express();

app.get('/reimburse', reimburseCtrl.doReimburse);

module.exports = app;