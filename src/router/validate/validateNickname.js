const InvalidNicknameError = require('../../error/InvalidNicknameError');

const nicknameRegex = /^\S{1,10}$/;

const validateNickname = (request, response, next) => {
  const nickname = request.body.nickname;

  if (nickname && nicknameRegex.test(nickname)) {
    next();
  } else {
    next(new InvalidNicknameError());
  }
};

module.exports = validateNickname;
