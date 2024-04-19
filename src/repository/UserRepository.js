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

  saveUser(profileImagePath, email, password, nickname) {
    this._storage.set(this._sequence, new User(profileImagePath, this._sequence, email, password, nickname));
  
    this._sequence++;

    // TODO clear, 확인용
    for (const [key, value] of this._storage) {
      console.log(key, value);
    }

    return this._storage.get(this._sequence - 1);
  }
}

module.exports = UserRepository;
