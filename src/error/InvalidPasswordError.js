class InvalidPasswordError extends Error {
  constructor() {
    const message = 'INVALID_PASSWORD';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidPasswordError;
