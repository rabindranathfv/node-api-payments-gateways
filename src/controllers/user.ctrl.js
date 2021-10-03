'use stric';
const userService = require('../services/user.service');

const getUsers = async(req, res) => {
  // route /users?limit=<value>&start=<value>
  console.log(` QueryParams `, req.query);
  let start = req.query.start || 0;
  start = Number(start);
  let limit = req.query.limit || 15;
  limit = Number(limit);
  const users = await userService.getUsers(req, res, start, limit);
}

const getUserById = async(req, res) => {
  let userId = req.params.id;
  let body = req.body;
  const user = await userService.getUserById(req, res, body, userId);
}





module.exports = {
  getUsers,
  getUserById
}