class Post {
  constructor(id, author, postImagePath, title, content) {
    this._id = id;
    this._author = author;
    this._postImagePath = postImagePath;
    this._title = title;
    this._content = content;
  }

  getId() {
    return this._id;
  }

  getAuthor() {
    return this._author;
  }

  getPostImagePath() {
    return this._postImagePath;
  }

  setPostImagePath(postImagePath) {
    this._postImagePath = postImagePath;
  }

  getTitle() {
    return this._title;
  }

  setTitle(title) {
    this._title = title;
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
      postImagePath: this._postImagePath,
      title: this._title,
      content: this._content,
    };
  }
}

module.exports = Post;
