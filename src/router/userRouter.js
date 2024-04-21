const express = require('express');
const multer = require('multer');

const UserController = require('../controller/UserController');

const UserNotFoundError = require('../error/UserNotFoundError');
const DuplicateEmailError = require('../error/DuplicateEmailError');
const DuplicateNicknameError = require('../error/DuplicateNicknameError');

const userController = new UserController();

const router = express.Router();

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const globalCommentErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (
    error instanceof UserNotFoundError ||
    error instanceof DuplicateEmailError ||
    error instanceof DuplicateNicknameError
  ) {
    return { status: error.status, message: error.message };
  } else if (error instanceof multer.MulterError) {
    return { status: 400, message: 'ONLY_ONE_IMAGE' };
  }

  console.log(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

router.patch(
  '/profile-image-and-nickname',
  upload.single('profile-image'),
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
