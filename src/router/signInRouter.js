const express = require('express');

const SignInController = require('../controller/SignInController');

const validateEmail = require('./validate/validateEmail');

const InvalidEmailError = require('../error/InvalidEmailError');
const UserNotFoundError = require('../error/UserNotFoundError');

const signInController = new SignInController();

// TODO 에러 핸들러 수정
const errorHandler = (error, request, response, next) => {
  let status;
  let message;

  if (
    error instanceof InvalidEmailError ||
    error instanceof UserNotFoundError
  ) {
    status = error.status;
    message = error.message;
  } else {
    status = 500;
    message = 'SERVER_ERROR';
  }

  console.log(error);

  response.status(status).json({ message: message });
};

const router = express.Router();

router.post('/', validateEmail, signInController.signIn, errorHandler);

module.exports = router;
