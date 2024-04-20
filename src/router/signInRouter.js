const express = require('express');
const SignInController = require('../controller/SignInController');

const signInController = new SignInController();

const UserNotFoundError = require('../error/UserNotFoundError');

const errorHandler = (error, request, response, next) => {
  let status;
  let message;

  if (error instanceof UserNotFoundError) {
    status = error.statusCode;
    message = error.message;
  } else {
    status = 500;
    message = 'SERVER_ERROR';
  }

  response.status(status).json({ message: message });
};

const router = express.Router();

router.post('/', signInController.signIn, errorHandler);

module.exports = router;
