const UserRepository = require('../repository/UserRepository');

class SignInController {
  constructor() {
    this._userRepository = new UserRepository();
  }

  signIn = (request, response, next) => {
    const { email, password } = request.body;

    try {
      this._userRepository.findUserByEmailAndPassword(email, password);

      response.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = SignInController;
