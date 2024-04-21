const express = require('express');

const UserController = require('../controller/UserController');

const UserNotFoundError = require('../error/UserNotFoundError');
const DuplicateEmailError = require('../error/DuplicateEmailError');

const userController = new UserController();

const router = express.Router();

const globalCommentErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  return error instanceof UserNotFoundError ||
    error instanceof DuplicateEmailError
    ? { status: error.status, message: error.message }
    : { status: 500, message: 'SERVER_ERROR' };
};

router.patch(
  '/profile-image-and-nickname',
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
