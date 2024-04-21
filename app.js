const express = require('express');

const signInRouter = require('./src/router/signInRouter');
const signUpRouter = require('./src/router/signUpRouter');
const userRouter = require('./src/router/userRouter');
const postRouter = require('./src/router/postRouter');

const app = express();

// x-www-form-urlencoded를 파싱하기 위해 사용
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/api/sign-in', signInRouter);
app.use('/api/sign-up', signUpRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.get('/', (request, response) => {
  response.send('Hello, world!');
});

app.listen(3000);
