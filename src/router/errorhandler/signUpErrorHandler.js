const InvalidProfileImageError = require('../../error/InvalidProfileImageError');
const InvalidEmailError = require('../../error/InvalidEmailError');
const InvalidPasswordError = require('../../error/InvalidPasswordError');
const InvalidNicknameError = require('../../error/InvalidNicknameError');
const DuplicateEmailError = require('../../error/DuplicateEmailError');
const DuplicateNicknameError = require('../../error/DuplicateNicknameError');

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidProfileImageError ||
    error instanceof InvalidEmailError ||
    error instanceof InvalidPasswordError ||
    error instanceof InvalidNicknameError ||
    error instanceof DuplicateEmailError ||
    error instanceof DuplicateNicknameError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

const signUpErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

module.exports = signUpErrorHandler;
