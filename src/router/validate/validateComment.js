const InvalidCommentError = require('../../error/InvalidCommentError');

const commentRegex = /.+/;

const validateComment = (request, response, next) => {
  const comment = request.body.content;

  if (comment && commentRegex.test(comment)) {
    next();
  } else {
    next(new InvalidCommentError());
  }
};

module.exports = validateComment;
