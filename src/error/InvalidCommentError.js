class InvalidCommentError extends Error {
  constructor() {
    const message = 'INVALID_COMMENT';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidCommentError;
