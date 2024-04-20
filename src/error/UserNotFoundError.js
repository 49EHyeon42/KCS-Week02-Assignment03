class UserNotFoundError extends Error {
  constructor() {
    const message = 'USER_NOT_FOUND';

    super(message);
    this.statusCode = 404;
  }
}

module.exports = UserNotFoundError;
