class User {
  constructor(profileImagePath, id, email, password, nickname) {
    this._profileImagePath = profileImagePath;
    this._id = id;
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

  getId() {
    return this._id;
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
}

module.exports = User;
