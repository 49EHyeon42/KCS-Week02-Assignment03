const fs = require('fs');
const path = require('path');

const UserRepository = require('../repository/UserRepository');

class SignUpController {
  constructor() {
    this._userRepository = new UserRepository();
  }

  signUp = (request, response, next) => {
    const profileImage = request.file;
    const { email, password, nickname } = request.body;

    const profileImagePath = `storage/profile-images/${email}${path.extname(profileImage.originalname)}`;

    this._userRepository.saveUser(profileImagePath, email, password, nickname);

    fs.renameSync(profileImage.path, profileImagePath);

    response.sendStatus(200);
  };
}

module.exports = SignUpController;
