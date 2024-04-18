const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('Hello, world!');
});

app.listen(3000);
