class InvalidEmailError extends Error {
  constructor() {
    const message = 'INVALID_EMAIL';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidEmailError;
