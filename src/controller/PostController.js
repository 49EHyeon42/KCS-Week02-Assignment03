const PostRepository = require('../repository/PostRepository');

class PostController {
  constructor() {
    this._postRepository = new PostRepository();
  }

  searchPost = (request, response, next) => {
    response.json(this._postRepository.findAllPost());
  };

  searchPostById = (request, response, next) => {
    const id = request.params.id;

    try {
      response.json(this._postRepository.findPostById(id));
    } catch (error) {
      console.log('PostController: ', error.message);

      next(error);
    }
  };

  writePost = (request, response, next) => {
    const postImage = request.file;
    // author는 인증, 인가 후 구현
    const { title, content } = request.body;

    this._postRepository.savePost('Test', postImage, title, content);

    response.sendStatus(200);
  };

  editPost = (request, response, next) => {
    const id = request.params.id;
    const postImage = request.file;
    const { title, content } = request.body;

    try {
      this._postRepository.updatePost(id, postImage, title, content);

      response.sendStatus(200);
    } catch (error) {
      next();
    }
  };

  deletePost = (request, response, next) => {
    const id = request.params.id;

    try {
      this._postRepository.deletePost(id);

      response.sendStatus(200);
    } catch (error) {
      next();
    }
  };
}

module.exports = PostController;
