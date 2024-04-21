class InvalidPostImageError extends Error {
  constructor() {
    const message = 'INVALID_POST_IMAGE';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidPostImageError;
