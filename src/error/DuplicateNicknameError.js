class DuplicateNicknameError extends Error {
  constructor() {
    const message = 'DUPLICATE_NICKNAME';

    super(message);
    this.status = 409;
  }
}

module.exports = DuplicateNicknameError;
