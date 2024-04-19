const UserRepository = require('../repository/UserRepository');

class SignInController {
  constructor() {
    this._userRepository = new UserRepository();
  }

  signInEmailAndPassword = (request, response, next) => {
    const { email, password } = request.body;

    // TODO clear
    console.log('email: ', email, ' password: ', password);

    try {
      this._userRepository.findUserIdByEmailAndPassword(email, password);

      response.sendStatus(200);
    } catch (error) {
      // TODO clear
      console.log('SignInController: ', error.message);

      // next(error);
      response.sendStatus(500);
    }
  };
}

module.exports = SignInController;
