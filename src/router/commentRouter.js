const express = require('express');

const router = express.Router({ mergeParams: true });

router.get('/', (request, response, next) => {
    console.log(request.params);

    console.log('이중 라우터 테스트: ', request.params.postId);

    response.sendStatus(200);
});

module.exports = router;
