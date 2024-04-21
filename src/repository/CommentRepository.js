const fs = require('fs');
const path = require('path');

const Comment = require('../model/Comment');

const CommentNotFoundError = require('../error/CommentNotFoundError');
const PostNotFoundError = require('../error/PostNotFoundError');

class CommentRepository {
  constructor() {
    this._COMMENT_JSON_PATH = 'storage/comment.json';
    this._POST_JSON_PATH = 'storage/post.json';
  }

  findAllCommentByPostId(postId) {
    this._checkPostByPostId(postId);

    return JSON.parse(fs.readFileSync(this._COMMENT_JSON_PATH)).comments.filter(
      (comment) => comment.postId == postId
    );
  }

  saveComment(postId, author, content) {
    this._checkPostByPostId(postId);

    const commentJson = JSON.parse(fs.readFileSync(this._COMMENT_JSON_PATH));

    commentJson.comments.push(
      new Comment(commentJson.sequence++, postId, author, content).toJson()
    );

    fs.writeFileSync(
      this._COMMENT_JSON_PATH,
      JSON.stringify(commentJson, null, 2)
    );
  }

  updateCommentByIdAndPostId(id, postId, content) {
    this._checkPostByPostId(postId);

    const commentJson = JSON.parse(fs.readFileSync(this._COMMENT_JSON_PATH));

    const foundComment = commentJson.comments.find(
      (comment) => comment.id == id && comment.postId == comment.postId
    );

    if (!foundComment) {
      throw new CommentNotFoundError();
    }

    foundComment.content = content;

    fs.writeFileSync(
      this._COMMENT_JSON_PATH,
      JSON.stringify(commentJson, null, 2)
    );
  }

  deleteCommentByIdAndPostID(id, postId) {
    this._checkPostByPostId(postId);

    const commentJson = JSON.parse(fs.readFileSync(this._COMMENT_JSON_PATH));

    const foundComment = commentJson.comments.find(
      (comment) => comment.id == id && comment.postId == comment.postId
    );

    if (!foundComment) {
      throw new CommentNotFoundError();
    }

    commentJson.comments.splice(foundComment, 1);

    fs.writeFileSync(
      this._COMMENT_JSON_PATH,
      JSON.stringify(commentJson, null, 2)
    );
  }

  _checkPostByPostId(postId) {
    if (
      !JSON.parse(fs.readFileSync(this._POST_JSON_PATH)).posts.some(
        (post) => post.id == postId
      )
    ) {
      throw new PostNotFoundError();
    }
  }
}

module.exports = PostRepository;
