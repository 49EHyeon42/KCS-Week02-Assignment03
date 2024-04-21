const InvalidPasswordError = require('../../error/InvalidPasswordError');

const PasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/;

const validatePassword = (request, response, next) => {
  const password = request.body.password;

  if (password && PasswordRegex.test(password)) {
    next();
  } else {
    next(new InvalidPasswordError());
  }
};

module.exports = validatePassword;
