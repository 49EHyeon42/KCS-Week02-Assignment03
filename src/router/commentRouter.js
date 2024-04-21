const express = require('express');

const CommentController = require('../controller/CommentController');

const CommentNotFoundError = require('../error/CommentNotFoundError');
const PostNotFoundError = require('../error/PostNotFoundError');

const commentController = new CommentController();

const router = express.Router({ mergeParams: true });

const globalCommentErrorHandler = (error, request, response, next) => {
  let status;
  let message;

  // 코드 중복, 마음에 안듬
  if (error instanceof PostNotFoundError) {
    status = error.status;
    message = error.message;
  } else if (error instanceof CommentNotFoundError) {
    status = error.status;
    message = error.message;
  } else {
    status = 500;
    message = 'SERVER_ERROR';
  }

  response.status(status).json({ message: message });
};

router.get('/', commentController.searchComment, globalCommentErrorHandler);

router.post('/', commentController.writeComment, globalCommentErrorHandler);

router.patch('/:id', commentController.editComment, globalCommentErrorHandler);

router.delete(
  '/:id',
  commentController.deleteComment,
  globalCommentErrorHandler
);

module.exports = router;
