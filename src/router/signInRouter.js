const express = require('express');

const SignInController = require('../controller/SignInController');

const validateEmail = require('./validate/validateEmail');
const validatePassword = require('./validate/validatePassword');

const InvalidEmailError = require('../error/InvalidEmailError');
const InvalidPasswordError = require('../error/InvalidPasswordError');
const UserNotFoundError = require('../error/UserNotFoundError');

const signInController = new SignInController();

const globalPostErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidEmailError ||
    error instanceof InvalidPasswordError ||
    error instanceof UserNotFoundError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

const router = express.Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  signInController.signIn,
  globalPostErrorHandler
);

module.exports = router;
