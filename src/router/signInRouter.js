const express = require('express');
const SignInController = require('../controller/SignInController');

const signInController = new SignInController();

const router = express.Router();

router.post('/', signInController.signInEmailAndPassword);

module.exports = router;
