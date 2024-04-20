const PostRepository = require('../repository/PostRepository');

class PostController {
  constructor() {
    this._postRepository = new PostRepository();
  }

  writePost = (request, response, next) => {
    const postImage = request.file;
    // author는 인증, 인가 후 구현
    const { title, content } = request.body;

    this._postRepository.savePost('Test', postImage, title, content);

    response.sendStatus(200);
  };
}

module.exports = PostController;
