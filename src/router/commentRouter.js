const express = require('express');

const CommentController = require('../controller/CommentController');

const validateComment = require('./validate/validateComment');

const commentErrorHandler = require('./errorhandler/commentErrorHandler');

const commentController = new CommentController();

const router = express.Router({ mergeParams: true });

router.get('/', commentController.searchComment, commentErrorHandler);

router.post(
  '/',
  validateComment,
  commentController.writeComment,
  commentErrorHandler
);

router.patch(
  '/',
  validateComment,
  commentController.editComment,
  commentErrorHandler
);

router.delete('/', commentController.deleteComment, commentErrorHandler);

module.exports = router;
