const fs = require('fs');
const path = require('path');

const Post = require('../model/Post');

class PostRepository {
  constructor() {
    this._POST_IMAGE_PATH = 'storage/post-images/';
    this._POST_JSON_PATH = 'storage/post.json';
  }

  findAllPost() {
    return JSON.parse(fs.readFileSync(this._POST_JSON_PATH)).posts;
  }

  savePost(author, postImage, title, content) {
    // post 사진 저장
    // TODO: 일단 title 유니크로 고정, 나중에 id 받으면 변경
    let postImagePath = null;

    if (postImage) {
      postImagePath = `${this._POST_IMAGE_PATH}${title}${path.extname(postImage.originalname)}`;

      fs.renameSync(postImage.path, postImagePath);
    }

    // post 저장
    const postJson = JSON.parse(fs.readFileSync(this._POST_JSON_PATH));

    postJson.posts.push(new Post(author, postImagePath, title, content));

    fs.writeFileSync(this._POST_JSON_PATH, JSON.stringify(postJson, null, 2));
  }
}

module.exports = PostRepository;
