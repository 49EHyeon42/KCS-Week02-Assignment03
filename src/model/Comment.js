class Comment {
  constructor(id, postId, author, content) {
    this._id = id;
    this._postId = postId;
    this._author = author;
    this._content = content;
  }

  getId() {
    return this._id;
  }

  getPostId() {
    return this._postId;
  }

  getAuthor() {
    return this._author;
  }

  getContent() {
    return this._content;
  }

  setContent(content) {
    this._content = content;
  }

  toJson() {
    return {
      id: this._id,
      author: this._author,
      content: this._content,
    };
  }
}

module.exports = Comment;
