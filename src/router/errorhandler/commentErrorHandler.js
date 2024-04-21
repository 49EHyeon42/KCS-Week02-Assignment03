const InvalidCommentError = require('../../error/InvalidCommentError');
const PostNotFoundError = require('../../error/PostNotFoundError');
const CommentNotFoundError = require('../../error/CommentNotFoundError');

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidCommentError ||
    error instanceof PostNotFoundError ||
    error instanceof CommentNotFoundError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

const commentErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

module.exports = commentErrorHandler;
