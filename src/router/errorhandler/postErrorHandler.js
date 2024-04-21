const InvalidPostImageError = require('../../error/InvalidPostImageError');
const InvalidTitleError = require('../../error/InvalidTitleError');
const InvalidContentError = require('../../error/InvalidContentError');
const PostNotFoundError = require('../../error/PostNotFoundError');

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidPostImageError ||
    error instanceof InvalidTitleError ||
    error instanceof InvalidContentError ||
    error instanceof PostNotFoundError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

const PostErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

module.exports = PostErrorHandler;
