const User = require('../model/User');

const UserNotFoundError = require('../error/UserNotFoundError');

class UserRepository {
  constructor() {
    this._storage = new Map();
    this._sequence = 0;
  }

  findUserIdByEmailAndPassword(email, password) {
    for (const [key, value] of this._storage) {
      if (value.email === email && value.password && password) {
        // TODO clear
        console.log('email: ', email, ' password: ', password);

        return key;
      }
    }

    throw new UserNotFoundError();
  }
}

module.exports = UserRepository;
