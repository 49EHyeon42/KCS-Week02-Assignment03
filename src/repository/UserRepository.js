const fs = require('fs');
const path = require('path');

const User = require('../model/User');

const UserNotFoundError = require('../error/UserNotFoundError');
const DuplicateEmailError = require('../error/DuplicateEmailError');
const DuplicateNicknameError = require('../error/DuplicateNicknameError');

class UserRepository {
  constructor() {
    this._PROFILE_IMAGE_PATH = 'storage/profile-images/';
    this._USER_JSON_PATH = 'storage/user.json';
  }

  findUserByEmailAndPassword(email, password) {
    const foundUser = JSON.parse(
      fs.readFileSync(this._USER_JSON_PATH)
    ).users.find((user) => user.email == email && user.password == password);

    if (foundUser) {
      return foundUser;
    }

    throw new UserNotFoundError();
  }

  saveUser(profileImage, email, password, nickname) {
    // 이메일 중복 확인
    this._checkDuplicateEmail(email);

    // 닉네임 중복 확인
    this._checkDuplicateNickname(nickname);

    // 프로필 사진 저장
    const profileImagePath = `${this._PROFILE_IMAGE_PATH}${email}${path.extname(profileImage.originalname)}`;

    fs.renameSync(profileImage.path, profileImagePath);

    // 회원 정보 저장
    const userJson = JSON.parse(fs.readFileSync(this._USER_JSON_PATH));

    userJson.users.push(
      new User(
        userJson.sequence++,
        profileImagePath,
        email,
        password,
        nickname
      ).toJson()
    );

    fs.writeFileSync(this._USER_JSON_PATH, JSON.stringify(userJson, null, 2));
  }

  // TODO: 이미지가 없는 경우, 에러 처리 필요
  updateUserProfileImageAndNicknameById(id, profileImage, nickname) {
    const userJson = JSON.parse(fs.readFileSync(this._USER_JSON_PATH));

    const foundUser = userJson.users.find((user) => user.id == id);

    if (!foundUser) {
      throw new UserNotFoundError();
    }

    // 닉네임 중복 확인
    this._checkDuplicateNickname(nickname);

    // 기존 프로필 이미지 삭제
    fs.unlinkSync(foundUser.profileImagePath);

    // 프로필 사진 저장
    const profileImagePath = `${this._PROFILE_IMAGE_PATH}${id}${path.extname(profileImage.originalname)}`;

    fs.renameSync(profileImage.path, profileImagePath);

    foundUser.profileImagePath = profileImagePath;
    foundUser.nickname = nickname;

    fs.writeFileSync(this._USER_JSON_PATH, JSON.stringify(userJson, null, 2));
  }

  updateUserPasswordById(id, password) {
    const userJson = JSON.parse(fs.readFileSync(this._USER_JSON_PATH));

    const foundUser = userJson.users.find((user) => user.id == id);

    if (!foundUser) {
      throw new UserNotFoundError();
    }

    foundUser.password = password;

    fs.writeFileSync(this._USER_JSON_PATH, JSON.stringify(userJson, null, 2));
  }

  deleteUserById(id) {
    const userJson = JSON.parse(fs.readFileSync(this._USER_JSON_PATH));

    const foundUser = userJson.users.find((user) => user.id == id);

    if (!foundUser) {
      throw new UserNotFoundError();
    }

    // 기존 프로필 이미지 삭제
    fs.unlinkSync(userJson.profileImagePath);

    userJson.users.splice(foundUser, 1);

    fs.writeFileSync(this._USER_JSON_PATH, JSON.stringify(userJson, null, 2));
  }

  _checkDuplicateEmail(email) {
    if (
      JSON.parse(fs.readFileSync(this._USER_JSON_PATH)).users.some(
        (user) => user.email === email
      )
    ) {
      throw new DuplicateEmailError();
    }
  }

  _checkDuplicateNickname(nickname) {
    if (
      JSON.parse(fs.readFileSync(this._USER_JSON_PATH)).users.some(
        (user) => user.nickname === nickname
      )
    ) {
      throw new DuplicateNicknameError();
    }
  }
}

module.exports = UserRepository;
