'use stric';
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const getUsers = catchAsync(async(req, res) => {
  // route /users?limit=<value>&start=<value>
  console.log(` QueryParams `, req.query);
  let start = req.query.start || 0;
  start = Number(start);
  let limit = req.query.limit || 15;
  limit = Number(limit);
  const users = await userService.getUsers(req, res, start, limit);
  if (!users) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Users not found');
  }
  res.send(users);
})

const getUserById = catchAsync(async(req, res) => {
  let userId = req.params.id;
  let body = req.body;
  const user = await userService.getUserById(req, res, body, userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  res.send(user);
})

module.exports = {
  getUsers,
  getUserById
}