const express = require('express');

const UserController = require('../controller/UserController');

const validateProfileImage = require('./validate/validateProfileImage');
const validateNickname = require('./validate/validateNickname');
const validatePassword = require('./validate/validatePassword');

const userErrorHandler = require('./errorhandler/userErrorHandler');

const userController = new UserController();

const router = express.Router();

router.patch(
  '/profile-image-and-nickname',
  validateProfileImage,
  validateNickname,
  userController.updateUserProfileImageAndNickname,
  userErrorHandler
);

router.patch(
  '/password',
  validatePassword,
  userController.updateUserPassword,
  userErrorHandler
);

router.delete('/', userController.deleteUser, userErrorHandler);

module.exports = router;
