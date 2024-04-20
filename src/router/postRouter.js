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

// TODO: edit 대신 write 작성
// TODO: 만약 파일이 2개 이상 들어오면, MulterError: Unexpected field 발생, 에러 처리 필요
router.post('/', upload.single('post-image'), postController.writePost);

module.exports = router;
