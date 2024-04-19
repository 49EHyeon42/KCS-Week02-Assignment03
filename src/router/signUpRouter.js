const express = require('express');
const multer = require('multer');
const path = require('path');

const SignUpController = require('../controller/SignUpController');

const signUpController = new SignUpController();

const router = express.Router();

const storage = multer.diskStorage({
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

// TODO 유효성 검사 나중에 구현
router.post('/', upload.single('profile-image'), signUpController.signUp);

module.exports = router;
