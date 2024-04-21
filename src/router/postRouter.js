const express = require('express');

const PostController = require('../controller/PostController');

const validatePostImage = require('./validate/validatePostImage');
const validateTitle = require('./validate/validateTitle');

const InvalidPostImageError = require('../error/InvalidPostImageError');
const InvalidTitleError = require('../error/InvalidTitleError');
const PostNotFoundError = require('../error/PostNotFoundError');

const postController = new PostController();

const router = express.Router();
const commentRouter = require('./commentRouter');

const globalPostErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (
    error instanceof InvalidPostImageError ||
    error instanceof InvalidTitleError ||
    error instanceof PostNotFoundError
  ) {
    return { status: error.status, message: error.message };
  }

  console.error(error);

  return { status: 500, message: 'SERVER_ERROR' };
};

router.get('/', postController.searchAllPost);

router.get('/:id', postController.searchOnePost, globalPostErrorHandler);

router.post(
  '/',
  validatePostImage,
  validateTitle,
  postController.writePost,
  globalPostErrorHandler
);

router.patch(
  '/:id',
  validatePostImage,
  validateTitle,
  postController.editPost,
  globalPostErrorHandler
);

router.delete('/:id', postController.deletePost, globalPostErrorHandler);

// 댓글 라우터 등록
router.use('/:postId/comments', commentRouter);

module.exports = router;
