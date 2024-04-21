const express = require('express');

const SignUpController = require('../controller/SignUpController');

const validateProfileImage = require('./validate/validateProfileImage');
const validateEmail = require('./validate/validateEmail');
const validatePassword = require('./validate/validatePassword');

const InvalidProfileImageError = require('../error/InvalidProfileImageError');
const InvalidEmailError = require('../error/InvalidEmailError');
const InvalidPasswordError = require('../error/InvalidPasswordError');
const DuplicateEmailError = require('../error/DuplicateEmailError');
const DuplicateNicknameError = require('../error/DuplicateNicknameError');

const signUpController = new SignUpController();

const router = express.Router();

const globalPostErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidProfileImageError ||
    error instanceof InvalidEmailError ||
    error instanceof InvalidPasswordError ||
    error instanceof DuplicateEmailError ||
    error instanceof DuplicateNicknameError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

router.post(
  '/',
  validateProfileImage,
  validateEmail,
  validatePassword,
  signUpController.signUp,
  globalPostErrorHandler
);

module.exports = router;
