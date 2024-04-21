// 피그마 요구사항을 맞추려면 더 다양한 에러 필요
class InvalidNicknameError extends Error {
  constructor() {
    const message = 'INVALID_NICKNAME';

    super(message);
    this.status = 400;
  }
}

module.exports = InvalidNicknameError;
