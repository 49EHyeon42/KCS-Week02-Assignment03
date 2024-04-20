const fs = require('fs');
const path = require('path');

const User = require('../model/User');

const UserNotFoundError = require('../error/UserNotFoundError');
const DuplicateEmailError = require('../error/DuplicateEmailError');

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

  saveUser(profileImage, email, password, nickname) {
    // 이메일 중복 에러
    if (this._findUserByEmail(email)) {
      throw new DuplicateEmailError();
    }

    // 프로필 사진 저장
    const profileImagePath = `storage/profile-images/${email}${path.extname(profileImage.originalname)}`;
    
    fs.renameSync(profileImage.path, profileImagePath);

    // 회원 정보 저장
    const userJson = JSON.parse(fs.readFileSync('storage/user.json'));

    userJson.users.push(new User(profileImagePath, email, password, nickname).toJson());

    fs.writeFileSync('storage/user.json', JSON.stringify(userJson, null, 2));
  
    this._sequence++;
  }

  _findUserByEmail(email) {
    return JSON.parse(fs.readFileSync('storage/user.json')).users.find(user => user.email === email);
  }
}

module.exports = UserRepository;
