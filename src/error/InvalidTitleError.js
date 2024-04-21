class InvalidTitleError extends Error {
  constructor() {
    const message = 'INVALID_TITLE';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidTitleError;
