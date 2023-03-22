const express = require('express');
const userController = require('../controller/user');
const authController = require("../controller/auth")

const router = express.Router();

router
  .post('/', authController.createUser)
  .get('/', userController.getAllUsers)
  .get('/:id', userController.getUser)
  .put('/:id', userController.replaceUser)
  .patch('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser);

exports.router = router;  