const multer = require('multer');

const InvalidProfileImageError = require('../../error/InvalidProfileImageError');

const storage = multer.diskStorage({
  filename: (request, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const validateProfileImage = (request, response, next) => {
  upload.single('profile-image')(request, response, (error) => {
    if (error instanceof multer.MulterError) {
      next(new InvalidProfileImageError());
    } else if (!request.file) {
      next(new InvalidProfileImageError());
    } else {
      next();
    }
  });
};

module.exports = validateProfileImage;
