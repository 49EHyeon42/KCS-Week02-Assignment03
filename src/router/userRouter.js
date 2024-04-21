const express = require('express');

const UserController = require('../controller/UserController');

const validateProfileImage = require('./validate/validateProfileImage');

const userErrorHandler = require('./errorhandler/userErrorHandler');

const userController = new UserController();

const router = express.Router();

router.patch(
  '/profile-image-and-nickname',
  validateProfileImage,
  userController.updateUserProfileImageAndNickname,
  userErrorHandler
);

router.patch('/password', userController.updateUserPassword, userErrorHandler);

router.delete('/', userController.deleteUser, userErrorHandler);

module.exports = router;
