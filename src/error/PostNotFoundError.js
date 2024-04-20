class PostNotFoundError extends Error {
  constructor() {
    const message = 'POST_NOT_FOUND';

    super(message);
    this.status = 404;
  }
}

module.exports = PostNotFoundError;
