const express = require('express');

const UserController = require('../controller/UserController');

const validateProfileImage = require('./validate/validateProfileImage');
const validatePassword = require('./validate/validatePassword');

const userErrorHandler = require('./errorhandler/userErrorHandler');

const userController = new UserController();

const router = express.Router();

// TODO 닉네임 유효성 검사 추가
router.patch(
  '/profile-image-and-nickname',
  validateProfileImage,
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
