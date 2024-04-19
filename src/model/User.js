class User {
  constructor(id, email, password, nickname) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._nickname = nickname;
  }

  getId() {
    return this._id;
  }

  getEmail() {
    return this._email;
  }

  setEmail(email) {
    this._email = email;
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
