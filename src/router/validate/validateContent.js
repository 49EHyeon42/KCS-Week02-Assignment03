const InvalidContentError = require('../../error/InvalidContentError');

const contentRegex = /.+/;

const validateContent = (request, response, next) => {
  const content = request.body.content;

  if (content && contentRegex.test(content)) {
    next();
  } else {
    next(new InvalidContentError());
  }
};

module.exports = validateContent;
