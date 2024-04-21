const UserRepository = require('../repository/UserRepository');

class UserController {
  constructor() {
    this._userRepository = new UserRepository();
  }

  updateUserProfileImageAndNickname = (request, response, next) => {
    const profileImage = request.file;
    const { id, nickname } = request.body;

    try {
      this._userRepository.updateUserProfileImageAndNicknameById(
        id,
        profileImage,
        nickname
      );

      response.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  updateUserPassword = (request, response, next) => {
    const { id, password } = request.body;

    try {
      this._userRepository.updateUserPasswordById(id, password);

      response.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  deleteUser = (request, response, next) => {
    const { id } = request.body;

    try {
      this._userRepository.deleteUserById(id);

      response.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UserController;
