'use strict';

// models
const UserModel = require('../models/users');


const getUsers = async(req, res, start, limit) => {

  // the find condition and count condition must be the same for count in the right way
  UserModel.find({ state: true }, 'name email rol')
    .skip(start)
    .limit(limit)
    .exec((err, usersLists) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: `not users exist`,
          err
        });
      }
      UserModel.countDocuments({ state: true }, (err, numUsers) => {
        res.json({
          ok: true,
          message: 'get list of users successfully',
          amountUsers: numUsers,
          user: usersLists
        });
      });
    });
}

const getUserById = async(req, res, ObjectUser, userId) => {
  UserModel.findByIdAndUpdate(userId, ObjectUser, { new: true, runValidators: true, useFindAndModify: 'false' })
    .exec((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          message: `the user doesn't exist`,
          err
        });
      }
      res.json({
        ok: true,
        message: `the user exist`,
        user: userDB
      });
    });
}
module.exports = {
  getUserById,
  getUsers,
}