class InvalidProfileImageError extends Error {
  constructor() {
    const message = 'INVALID_PROFILE_IMAGE';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidProfileImageError;
