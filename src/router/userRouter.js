const express = require('express');

const UserController = require('../controller/UserController');

const validateProfileImage = require('./validate/validateProfileImage');

const InvalidProfileImageError = require('../error/InvalidProfileImageError');
const UserNotFoundError = require('../error/UserNotFoundError');
const DuplicateNicknameError = require('../error/DuplicateNicknameError');

const userController = new UserController();

const router = express.Router();

const globalCommentErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidProfileImageError ||
    error instanceof UserNotFoundError ||
    error instanceof DuplicateNicknameError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

router.patch(
  '/profile-image-and-nickname',
  validateProfileImage,
  userController.updateUserProfileImageAndNickname,
  globalCommentErrorHandler
);

router.patch(
  '/password',
  userController.updateUserPassword,
  globalCommentErrorHandler
);

router.delete('/', userController.deleteUser, globalCommentErrorHandler);

module.exports = router;
