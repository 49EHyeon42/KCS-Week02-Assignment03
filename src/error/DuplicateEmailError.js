class DuplicateEmailError extends Error {
  constructor() {
    const message = 'DUPLICATE_EMAIL';

    super(message);
    this.status = 409;
  }
}

module.exports = DuplicateEmailError;
