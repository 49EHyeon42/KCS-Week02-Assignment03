class DuplicateEmailError extends Error {
  constructor() {
    const message = 'DUPLICATE_EMAIL';

    super(message);
    this.statusCode = 409;
  }
}

module.exports = DuplicateEmailError;
