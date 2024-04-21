const express = require('express');
const multer = require('multer');

const PostController = require('../controller/PostController');

const PostNotFoundError = require('../error/PostNotFoundError');

const postController = new PostController();

const router = express.Router();
const commentRouter = require('./commentRouter');

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const globalPostErrorHandler = (error, request, response, next) => {
  const { status, message } = getErrorDetails(error);

  response.status(status).json({ message });
};

const getErrorDetails = (error) => {
  if (error instanceof multer.MulterError) {
    return { status: 400, message: 'ONLY_ONE_IMAGE' };
  } else if (error instanceof PostNotFoundError) {
    return { status: error.status, message: error.message };
  }
  return { status: 500, message: 'SERVER_ERROR' };
};

router.get('/', postController.searchAllPost);

router.get('/:id', postController.searchOnePost, globalPostErrorHandler);

router.post(
  '/',
  upload.single('post-image'),
  postController.writePost,
  globalPostErrorHandler
);

router.patch(
  '/:id',
  upload.single('post-image'),
  postController.editPost,
  globalPostErrorHandler
);

router.delete('/:id', postController.deletePost, globalPostErrorHandler);

// 댓글 라우터 등록
router.use('/:postId/comments', commentRouter);

module.exports = router;
