const express = require('express');
const multer = require('multer');

const SignUpController = require('../controller/SignUpController');

const validateEmail = require('./validate/validateEmail');
const validatePassword = require('./validate/validatePassword');

const InvalidEmailError = require('../error/InvalidEmailError');
const InvalidPasswordError = require('../error/InvalidPasswordError');
const DuplicateEmailError = require('../error/DuplicateEmailError');
const DuplicateNicknameError = require('../error/DuplicateNicknameError');

const signUpController = new SignUpController();

const router = express.Router();

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const globalPostErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (error instanceof multer.MulterError) {
    return { status: 400, message: 'ONLY_ONE_IMAGE' };
  } else if (
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

// TODO 이미지가 없는 경우 에러 처리 필요
router.post(
  '/',
  upload.single('profile-image'),
  validateEmail,
  validatePassword,
  signUpController.signUp,
  globalPostErrorHandler
);

module.exports = router;
