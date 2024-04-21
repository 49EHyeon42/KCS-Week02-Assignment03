const multer = require('multer');

const InvalidPostImageError = require('../../error/InvalidPostImageError');

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const validatePostImage = (request, response, next) => {
  upload.single('post-image')(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      next(new InvalidPostImageError());
    } else if (!request.file) {
      next(new InvalidPostImageError());
    } else {
      next();
    }
  });
};

module.exports = validatePostImage;
