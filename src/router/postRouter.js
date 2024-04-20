const express = require('express');
const multer = require('multer');

const PostController = require('../controller/PostController');

const PostNotFoundError = require('../error/PostNotFoundError');

const postController = new PostController();

const router = express.Router();

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const globalErrorHandler = (error, request, response, next) => {
  console.log(error.message);

  response.status(500).json({ message: 'SERVER_ERROR' });
};

router.get('/', postController.searchPost);

router.get(
  '/:id',
  postController.searchPostById,
  (error, request, response, next) => {
    if (error instanceof PostNotFoundError) {
      response.status(error.status).json({ message: error.message });
    } else {
      next();
    }
  },
  globalErrorHandler
);

// TODO: edit 대신 write 작성
router.post(
  '/',
  upload.single('post-image'),
  postController.writePost,
  (error, request, response, next) => {
    if (error instanceof multer.MulterError) {
      response.status(400).json({ message: 'ONLY_ONE_IMAGE' });
    } else {
      next();
    }
  },
  globalErrorHandler
);

router.patch(
  '/:id',
  upload.single('post-image'),
  postController.editPost,
  (error, request, response, next) => {
    if (error instanceof multer.MulterError) {
      response.status(400).json({ message: 'ONLY_ONE_IMAGE' });
    } else if (error instanceof PostNotFoundError) {
      response.status(error.status).json({ message: error.message });
    } else {
      next();
    }
  },
  globalErrorHandler
);

router.delete(
  '/:id',
  postController.deletePost,
  (error, request, response, next) => {
    if (error instanceof PostNotFoundError) {
      response.status(error.status).json({ message: error.message });
    } else {
      next();
    }
  },
  globalErrorHandler
);

module.exports = router;
