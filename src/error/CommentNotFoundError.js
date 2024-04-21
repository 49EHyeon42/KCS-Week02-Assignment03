class CommentNotFoundError extends Error {
  constructor() {
    const message = 'COMMENT_NOT_FOUND';

    super(message);
    this.status = 404;
  }
}

module.exports = CommentNotFoundError;
