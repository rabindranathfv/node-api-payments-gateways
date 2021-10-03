'use strict';
const httpStatus = require('http-status');
const logger = require('../config/logger');

const getHealth = async(req, res) => {
  logger.info('Services are up and running');
  return res.status(httpStatus.OK).send(
    {
      ok: true,
      message: `Healty API`,
    }
  );
}

module.exports = {
  getHealth,
}