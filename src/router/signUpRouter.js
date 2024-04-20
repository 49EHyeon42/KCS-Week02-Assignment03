const express = require('express');
const multer = require('multer');

const SignUpController = require('../controller/SignUpController');

const DuplicateEmailError = require('../error/DuplicateEmailError');

const signUpController = new SignUpController();

const router = express.Router();

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const errorHandler = (error, request, response, next) => {
  let status;
  let message;

  if (error instanceof multer.MulterError) {
    status = 400;
    message = 'ONLY_SINGLE_IMAGE';
  } else if (error instanceof DuplicateEmailError) {
    status = error.statusCode;
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
  signUpController.signUp,
  errorHandler
);

module.exports = router;
