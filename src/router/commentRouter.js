const express = require('express');

const CommentController = require('../controller/CommentController');

const commentErrorHandler = require('./errorhandler/commentErrorHandler');

const commentController = new CommentController();

const router = express.Router({ mergeParams: true });

router.get('/', commentController.searchComment, commentErrorHandler);

router.post('/', commentController.writeComment, commentErrorHandler);

router.patch('/', commentController.editComment, commentErrorHandler);

router.delete('/', commentController.deleteComment, commentErrorHandler);

module.exports = router;
