const express = require('express');

const SignInController = require('../controller/SignInController');

const validateEmail = require('./validate/validateEmail');
const validatePassword = require('./validate/validatePassword');

const signInErrorHandler = require('./errorhandler/signInErrorHandler');

const signInController = new SignInController();

const router = express.Router();

router.post(
  '/',
  validateEmail,
  validatePassword,
  signInController.signIn,
  signInErrorHandler
);

module.exports = router;
