'use stric';
const catchAsync = require('../utils/catchAsync');
const reimburseServices = require('../services/reimburse.services');

const doReimburse = catchAsync(async(req, res) => {
  // eslint-disable-next-line no-unused-vars
  const reimburse = await reimburseServices.doReimburse(req, res);
})

module.exports = {
  doReimburse,
}