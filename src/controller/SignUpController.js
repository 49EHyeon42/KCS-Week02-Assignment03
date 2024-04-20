const UserRepository = require('../repository/UserRepository');

class SignUpController {
  constructor() {
    this._userRepository = new UserRepository();
  }

  signUp = (request, response, next) => {
    const profileImage = request.file;
    const { email, password, nickname } = request.body;

    this._userRepository.saveUser(profileImage, email, password, nickname);

    response.sendStatus(200);
  };
}

module.exports = SignUpController;
