const express = require('express');

const PostController = require('../controller/PostController');

const validatePostImage = require('./validate/validatePostImage');
const validateTitle = require('./validate/validateTitle');
const validateContent = require('./validate/validateContent');

const postErrorHandler = require('./errorhandler/postErrorHandler');

const postController = new PostController();

const router = express.Router();
const commentRouter = require('./commentRouter');

router.get('/', postController.searchAllPost);

router.get('/:id', postController.searchOnePost, postErrorHandler);

router.post(
  '/',
  validatePostImage,
  validateTitle,
  validateContent,
  postController.writePost,
  postErrorHandler
);

router.patch(
  '/:id',
  validatePostImage,
  validateTitle,
  validateContent,
  postController.editPost,
  postErrorHandler
);

router.delete('/:id', postController.deletePost, postErrorHandler);

// 댓글 라우터 등록
router.use('/:postId/comments', commentRouter);

module.exports = router;
