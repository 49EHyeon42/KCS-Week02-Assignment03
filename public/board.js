// 드롭다운 관련 로직
const profileImageDropdown = document.querySelector('.profile-image-dropdown');

document.querySelector('.profile-image').addEventListener('click', () => {
  profileImageDropdown.classList.toggle('show');
});

document.getElementById('edit-post-button').addEventListener('click', () => {
  window.location.href = 'edit-post.html';
});

/* 2주차 2-2. Fetch 적용 */

// 글자 밀림 방지
function changeTextToInnerText(text) {
  const value = parseInt(text.innerText);

  if (isNaN(value) || value < 0) {
    text.innerText = 'ERROR';
  } else if (value < 1000) {
    // 무시
  } else if (value < 10000) {
    text.innerText = '1k';
  } else if (value < 100000) {
    text.innerText = '10k';
  } else {
    text.innerText = '100k';
  }
}

const title = document.querySelector('.post-title');
const likes = document.getElementById('likes');
const comments = document.getElementById('comments');
const views = document.getElementById('views');
const createdDate = document.getElementById('created-date');

fetch('./json/board.json')
  .then((response) => response.json())
  .then((json) => {
    title.innerText = json.posts[0].title;
    likes.innerText = json.posts[0].likes;
    comments.innerText = json.posts[0].comments;
    views.innerText = json.posts[0].views;
    createdDate.innerText = json.posts[0].createdDate;

    changeTextToInnerText(likes);
    changeTextToInnerText(comments);
    changeTextToInnerText(views);
  });
