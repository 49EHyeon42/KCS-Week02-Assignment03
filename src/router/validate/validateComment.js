const InvalidCommentError = require('../../error/InvalidCommentError');

const commentRegex = /.+/;

const validateComment = (request, response, next) => {
  // TODO 변수명 contnet에서 comment로 변경
  const comment = request.body.content;

  if (comment && commentRegex.test(comment)) {
    next();
  } else {
    next(new InvalidCommentError());
  }
};

module.exports = validateComment;
