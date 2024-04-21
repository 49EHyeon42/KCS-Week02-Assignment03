const CommentRepository = require('../repository/CommentRepository');

class CommentController {
  constructor() {
    this._commentRepository = new CommentRepository();
  }

  searchComment = (request, response, next) => {
    const postId = request.params.postId;

    try {
      response.json(this._commentRepository.findAllCommentByPostId(postId));
    } catch (error) {
      next(error);
    }
  };

  writeComment = (request, response, next) => {
    const postId = request.params.postId;
    const { content } = request.body;

    try {
      this._commentRepository.saveComment(
        request.params.postId,
        'Test',
        content
      );

      response.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  editComment = (request, response, next) => {
    const postId = request.params.postId;
    const { id, content } = request.body;

    try {
      this._commentRepository.updateCommentByIdAndPostId(id, postId, content);

      response.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  deleteComment = (request, response, next) => {
    const postId = request.params.postId;
    const { id } = request.body;

    try {
      this._commentRepository.deleteCommentByIdAndPostId(id, postId);

      response.sendStatus(200);
    } catch (error) {}
  };
}

module.exports = CommentRepository;
