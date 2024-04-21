const express = require('express');

const CommentController = require('../controller/CommentController');

const CommentNotFoundError = require('../error/CommentNotFoundError');
const PostNotFoundError = require('../error/PostNotFoundError');

const commentController = new CommentController();

const router = express.Router({ mergeParams: true });

const globalCommentErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (
    error instanceof PostNotFoundError ||
    error instanceof CommentNotFoundError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

router.get('/', commentController.searchComment, globalCommentErrorHandler);

router.post('/', commentController.writeComment, globalCommentErrorHandler);

router.patch('/', commentController.editComment, globalCommentErrorHandler);

router.delete('/', commentController.deleteComment, globalCommentErrorHandler);

module.exports = router;
