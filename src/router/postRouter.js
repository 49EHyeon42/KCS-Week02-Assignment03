const express = require('express');
const multer = require('multer');

const PostController = require('../controller/PostController');

const postController = new PostController();

const router = express.Router();

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const errorHandler = (error, request, response, next) => {
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
};

router.get('/', postController.searchPost);

// TODO: edit 대신 write 작성
router.post(
  '/',
  upload.single('post-image'),
  postController.writePost,
  errorHandler
);

module.exports = router;
