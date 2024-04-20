const fs = require('fs');

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
    const userJson = JSON.parse(fs.readFileSync('storage/user.json'));

    userJson.users.push(new User(this._sequence, profileImagePath, email, password, nickname).toJson());

    fs.writeFileSync('storage/user.json', JSON.stringify(userJson, null, 2));
  
    this._sequence++;
  }
}

module.exports = UserRepository;
