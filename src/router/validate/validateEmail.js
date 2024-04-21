const InvalidEmailError = require('../../error/InvalidEmailError');

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

const validateEmail = (request, response, next) => {
  const email = request.body.email;

  if (email && emailRegex.test(email)) {
    next();
  } else {
    next(new InvalidEmailError());
  }
};

module.exports = validateEmail;
