const fs = require('fs');
const path = require('path');

// const UserRepository = require('../repository/UserRepository');

class SignUpController {
  constructor() {
    // this._userRepository = new UserRepository();
  }

  signUp = (request, response, next) => {
    const profileImage = request.file;
    const { email, password, nickname } = request.body;

    // TODO clear
    console.log('email: ', email, ' password: ', password, ' nickname: ', nickname);

    const filePath = `storage/profile-images/${email}${path.extname(profileImage.originalname)}`;

    fs.renameSync(profileImage.path, filePath);

    response.sendStatus(200);

    // try {
    //   this._userRepository.saveUser(profileImage, email, password, nickname);

    //   response.sendStatus(200);
    // } catch (error) {
    //   // TODO clear
    //   console.log('SignUpController: ', error.message);

    //   // next(error);
    //   response.sendStatus(500);
    // }
  };
}

module.exports = SignUpController;
