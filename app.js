const express = require('express');

const signInRouter = require('./src/router/signInRouter');
const signUpRouter = require('./src/router/signUpRouter');

const app = express();

// x-www-form-urlencoded를 파싱하기 위해 사용
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use('/api/sign-in', signInRouter);
app.use('/api/sign-up', signUpRouter);

app.get('/', (request, response) => {
  response.send('Hello, world!');
});

app.listen(3000);
