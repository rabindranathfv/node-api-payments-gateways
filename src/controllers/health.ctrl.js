'use stric';
const healthServices = require('../services/health.services');

const getUsers = async(req, res) => {
  // eslint-disable-next-line no-unused-vars
  const health = await healthServices.getHealth(req, res);
}

module.exports = {
  getUsers,
}