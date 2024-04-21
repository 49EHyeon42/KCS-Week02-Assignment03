const InvalidProfileImageError = require('../../error/InvalidProfileImageError');
const InvalidPasswordError = require('../../error/InvalidPasswordError');
const InvalidNicknameError = require('../../error/InvalidNicknameError');
const UserNotFoundError = require('../../error/UserNotFoundError');
const DuplicateNicknameError = require('../../error/DuplicateNicknameError');

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidProfileImageError ||
    error instanceof InvalidPasswordError ||
    error instanceof InvalidNicknameError ||
    error instanceof UserNotFoundError ||
    error instanceof DuplicateNicknameError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

const userErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

module.exports = userErrorHandler;
