const express = require('express');

const SignUpController = require('../controller/SignUpController');

const validateProfileImage = require('./validate/validateProfileImage');
const validateEmail = require('./validate/validateEmail');
const validatePassword = require('./validate/validatePassword');
const validateNickname = require('./validate/validateNickname');

const signUpErrorHandler = require('./errorhandler/signUpErrorHandler');

const signUpController = new SignUpController();

const router = express.Router();

// TODO 닉네임 유효성 검사 필요
router.post(
  '/',
  validateProfileImage,
  validateEmail,
  validatePassword,
  validateNickname,
  signUpController.signUp,
  signUpErrorHandler
);

module.exports = router;
