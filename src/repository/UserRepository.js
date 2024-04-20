const fs = require('fs');
const path = require('path');

const User = require('../model/User');

const UserNotFoundError = require('../error/UserNotFoundError');
const DuplicateEmailError = require('../error/DuplicateEmailError');

class UserRepository {
  constructor() {
    this._PROFILE_IMAGE_PATH = 'storage/profile-images/';
    this._USER_JSON_PATH = 'storage/user.json';
  }

  findUserByEmailAndPassword(email, password) {
    const foundUser = JSON.parse(fs.readFileSync(this._USER_JSON_PATH)).users.find(user => user.email == email && user.password == password);

    if (foundUser) {
      return foundUser;
    }

    throw new UserNotFoundError();
  }

  saveUser(profileImage, email, password, nickname) {
    // 이메일 중복 에러
    if (this._findUserByEmail(email)) {
      throw new DuplicateEmailError();
    }

    // 프로필 사진 저장
    const profileImagePath = `${this._PROFILE_IMAGE_PATH}${email}${path.extname(profileImage.originalname)}`;
    
    fs.renameSync(profileImage.path, profileImagePath);

    // 회원 정보 저장
    const userJson = JSON.parse(fs.readFileSync(this._USER_JSON_PATH));

    userJson.users.push(new User(profileImagePath, email, password, nickname).toJson());

    fs.writeFileSync(this._USER_JSON_PATH, JSON.stringify(userJson, null, 2));
  }

  _findUserByEmail(email) {
    return JSON.parse(fs.readFileSync(this._USER_JSON_PATH)).users.find(user => user.email === email);
  }
}

module.exports = UserRepository;
