const express = require('express');
const multer = require('multer');

const SignUpController = require('../controller/SignUpController');

const validateEmail = require('./validate/validateEmail');

const InvalidEmailError = require('../error/InvalidEmailError');
const DuplicateEmailError = require('../error/DuplicateEmailError');

const signUpController = new SignUpController();

const router = express.Router();

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

// TODO 에러 핸들러 수정
const errorHandler = (error, request, response, next) => {
  let status;
  let message;

  if (error instanceof multer.MulterError) {
    status = 400;
    message = 'ONLY_ONE_IMAGE';
  } else if (
    error instanceof InvalidEmailError ||
    error instanceof DuplicateEmailError
  ) {
    status = error.status;
    message = error.message;
  } else {
    status = 500;
    message = 'SERVER_ERROR';
  }

  response.status(status).json({ message: message });
};

// TODO 유효성 검사 나중에 구현
router.post(
  '/',
  upload.single('profile-image'),
  validateEmail,
  signUpController.signUp,
  errorHandler
);

module.exports = router;
