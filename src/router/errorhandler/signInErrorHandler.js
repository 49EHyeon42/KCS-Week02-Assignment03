const InvalidEmailError = require('../../error/InvalidEmailError');
const InvalidPasswordError = require('../../error/InvalidPasswordError');
const UserNotFoundError = require('../../error/UserNotFoundError');

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidEmailError ||
    error instanceof InvalidPasswordError ||
    error instanceof UserNotFoundError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

const signInErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

module.exports = signInErrorHandler;
