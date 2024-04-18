// init
const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,20}$/;

// status
let validEmailStatus = false;
let validPasswordStatus = false;

function validteAll() {
  return validEmailStatus && validPasswordStatus;
}

// status에 따라 로그인 버튼 색 변경 로직
const signInButton = document.getElementById('sign-in-button');

// (임시) 로그인 시 board 페이지로 이동
signInButton.addEventListener('click', () => {
  if (validteAll()) {
    window.location.href = 'board.html';
  }
});

function changeButtonColor() {
  signInButton.style.backgroundColor = validteAll() ? '#7F6AEE' : '#ACA0EB';
}

// 이메일 관련 로직
const emailInput = document.getElementById('email');
const emailHelperText = document.getElementById('email-helper-text');

emailInput.addEventListener('change', () => {
  const value = emailInput.value.trim();

  validEmailStatus = emailRegex.test(value);

  emailHelperText.innerText = validEmailStatus
    ? ''
    : '* 올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)';

  changeButtonColor();
});

// 비밀번호 관련 로직
const passwordInput = document.getElementById('password');
const passwordHelperText = document.getElementById('password-helper-text');

passwordInput.addEventListener('change', () => {
  const value = passwordInput.value.trim();

  if (value.length == 0) {
    validPasswordStatus = false;

    passwordHelperText.innerText = '* 비밀번호를 입력해주세요.';
  } else if (passwordRegex.test(value)) {
    validPasswordStatus = true;

    passwordHelperText.innerText = '';
  } else {
    validPasswordStatus = false;

    passwordHelperText.innerText =
      '* 비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수 문자를 각각 최소 1개 포함해야 합니다.';
  }

  changeButtonColor();
});
