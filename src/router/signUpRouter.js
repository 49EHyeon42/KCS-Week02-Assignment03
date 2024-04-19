const express = require('express');
const multer = require('multer');
const path = require('path');

const SignUpController = require('../controller/SignUpController');

const signUpController = new SignUpController();

const router = express.Router();

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './storage/profile-images');
    },
    filename: (request, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', upload.single('profile-image'), (request, response) => {
    const imageFile = request.file;

    if (!imageFile) {
        return request.status(400).send('No image uploaded.');
    }

    response.sendFile(path.resolve(imageFile.path));
});

module.exports = router;
