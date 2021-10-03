'use strict';
const httpStatus = require('http-status');
const logger = require('../config/logger');

const doReimburse = async(req, res) => {
  logger.info('Reimburse in progress');

  res.status(httpStatus.OK).send(
    {
      ok: true,
      message: `reimburse successfuly`,
    }
  );
}

module.exports = {
  doReimburse,
}