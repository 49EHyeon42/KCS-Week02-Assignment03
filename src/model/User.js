class User {
  constructor(profileImagePath, email, password, nickname) {
    this._profileImagePath = profileImagePath;
    this._email = email;
    this._password = password;
    this._nickname = nickname;
  }

  getProfileImagePath() {
    return this._profileImagePath;
  }

  setProfileImagePath(profileImagePath) {
    this._profileImagePath = profileImagePath;
  }

  getEmail() {
    return this._email;
  }

  getPassword() {
    return this._password;
  }

  setPassword(password) {
    this._password = password;
  }

  getNickname() {
    return this._nickname;
  }

  setNickname(nickname) {
    this._nickname = nickname;
  }

  toJson() {
    return {
      profileImagePath: this._profileImagePath,
      email: this._email,
      password: this._password,
      nickname: this._nickname,
    };
  }
}

module.exports = User;
