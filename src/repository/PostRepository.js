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
    const postJson = JSON.parse(fs.readFileSync(this._POST_JSON_PATH));

    // 사진 저장
    let postImagePath = null;

    if (postImage) {
      postImagePath = `${this._POST_IMAGE_PATH}${postJson.sequence}${path.extname(postImage.originalname)}`;

      fs.renameSync(postImage.path, postImagePath);
    }

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

  updatePostById(id, postImage, title, content) {
    const postJson = JSON.parse(fs.readFileSync(this._POST_JSON_PATH));

    const foundPost = postJson.posts.find((post) => post.id == id);

    if (!foundPost) {
      throw new PostNotFoundError();
    }

    // 기존 게시글 이미지 삭제
    if (foundPost.postImagePath !== null) {
      fs.unlinkSync(foundPost.postImagePath);
    }

    let postImagePath = null;

    if (postImage) {
      postImagePath = `${this._POST_IMAGE_PATH}${id}${path.extname(postImage.originalname)}`;

      fs.renameSync(postImage.path, postImagePath);
    }

    foundPost.postImagePath = postImagePath;
    foundPost.title = title;
    foundPost.content = content;

    fs.writeFileSync(this._POST_JSON_PATH, JSON.stringify(postJson, null, 2));
  }

  deletePostById(id) {
    const postJson = JSON.parse(fs.readFileSync(this._POST_JSON_PATH));

    const foundPost = postJson.posts.find((post) => post.id == id);

    if (!foundPost) {
      throw new PostNotFoundError();
    }

    // 기존 게시글 이미지 삭제
    if (foundPost.postImagePath !== null) {
      fs.unlinkSync(foundPost.postImagePath);
    }

    postJson.posts.splice(foundPost, 1);

    fs.writeFileSync(this._POST_JSON_PATH, JSON.stringify(postJson, null, 2));
  }
}

module.exports = PostRepository;
