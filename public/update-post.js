// status
let validTitleStatus = true;
let validContentStatus = true;

const helperText = document.querySelector('.helper-text');
const updatePostButton = document.getElementById('update-post-button');

function changeHelpTextAndButtonColor() {
  if (validTitleStatus && validContentStatus) {
    helperText.innerText = '';

    updatePostButton.style.backgroundColor = '#7F6AEE';
  } else {
    helperText.innerText = '* 제목, 내용을 모두 작성해주세요.';

    updatePostButton.style.backgroundColor = '#ACA0EB';
  }
}

// 뒤로가기 버튼 로직
document.querySelector('.move-page-button').addEventListener('click', () => {
  window.location.href = 'post.html';
});

// 드롭다운 메뉴 관련 로직
const profileImageDropdown = document.querySelector('.profile-image-dropdown');

document.querySelector('.profile-image').addEventListener('click', () => {
  profileImageDropdown.classList.toggle('show');
});

// 제목 관련 로직
const titleInput = document.getElementById('title');

titleInput.addEventListener('change', () => {
  const value = titleInput.value.trim();

  validTitleStatus = value.length != 0;

  changeHelpTextAndButtonColor();
});

// 내용 관련 로직
const contentInput = document.getElementById('content');

contentInput.addEventListener('change', () => {
  const value = contentInput.value.trim();

  validContentStatus = value.length != 0;

  changeHelpTextAndButtonColor();
});

/* 2주차 2-2. Fetch 적용 */
fetch('./json/update-post.json')
  .then((response) => response.json())
  .then((json) => {
    titleInput.value = json.title;
    contentInput.value = json.content;
  });
