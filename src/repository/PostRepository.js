const fs = require('fs');
const path = require('path');

const Post = require('../model/Post');

const PostNotFoundError = require('../error/PostNotFoundError');

class PostRepository {
  constructor() {
    this._POST_IMAGE_PATH = 'storage/post-images/';
    this._POST_JSON_PATH = 'storage/post.json';
  }

  findAllPost() {
    return JSON.parse(fs.readFileSync(this._POST_JSON_PATH)).posts;
  }

  findPostById(id) {
    const foundPost = JSON.parse(
      fs.readFileSync(this._POST_JSON_PATH)
    ).posts.find((post) => post.id == id);

    if (foundPost) {
      return foundPost;
    }

    throw new PostNotFoundError();
  }

  savePost(author, postImage, title, content) {
    // 사진 저장
    let postImagePath = null;

    if (postImage) {
      postImagePath = `${this._POST_IMAGE_PATH}${title}${path.extname(postImage.originalname)}`;

      fs.renameSync(postImage.path, postImagePath);
    }

    // 나머지 저장
    const postJson = JSON.parse(fs.readFileSync(this._POST_JSON_PATH));

    postJson.posts.push(
      new Post(
        postJson.sequence++,
        author,
        postImagePath,
        title,
        content
      ).toJson()
    );

    fs.writeFileSync(this._POST_JSON_PATH, JSON.stringify(postJson, null, 2));
  }
}

module.exports = PostRepository;
