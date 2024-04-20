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

router.get('/', postController.searchPost);

router.get(
  '/:id',
  postController.searchPostById,
  (error, request, response, next) => {
    let status;
    let message;

    if (error instanceof PostNotFoundError) {
      status = error.statusCode;
      message = error.message;
    } else {
      status = 500;
      message = 'SERVER_ERROR';
    }

    response.status(status).json({ message: message });
  }
);

// TODO: edit 대신 write 작성
router.post(
  '/',
  upload.single('post-image'),
  postController.writePost,
  (error, request, response, next) => {
    let status;
    let message;

    if (error instanceof multer.MulterError) {
      status = 400;
      message = 'ONLY_ONE_IMAGE';
    } else {
      status = 500;
      message = 'SERVER_ERROR';
    }

    response.status(status).json({ message: message });
  }
);

module.exports = router;
