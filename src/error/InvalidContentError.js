class InvalidContentError extends Error {
  constructor() {
    const message = 'INVALID_CONTENT';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidContentError;
