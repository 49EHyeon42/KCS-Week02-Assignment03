const InvalidTitleError = require('../../error/InvalidTitleError');

const titleRegex = /^.{1,26}$/;

const validateTitle = (request, response, next) => {
  const title = request.body.title;

  if (title && titleRegex.test(title)) {
    next();
  } else {
    next(new InvalidTitleError());
  }
};

module.exports = validateTitle;
