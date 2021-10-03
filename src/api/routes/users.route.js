const express = require('express');
const userCtrl = require('../../controllers/user.ctrl');

const app = express();

app.get('/users', userCtrl.getUsers);

app.get('/users/:id', userCtrl.getUserById);

// app.post('/users', [checkToken, checkAdMinRole], userCtrl.postCreateUser);

// app.put('/users/password', checkToken, userCtrl.updateUserPassword);

// app.put('/users/:id', [checkToken, checkAdMinRole], userCtrl.updateUser);

/* hard delete */
// app.delete('/users/:id', [checkToken, checkAdMinRole], userCtrl.hardDeleteUser);

module.exports = app;