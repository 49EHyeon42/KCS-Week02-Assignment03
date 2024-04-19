const express = require('express');
const SignInController = require('../controller/SignInController');

const signInController = new SignInController();

const router = express.Router();

router.get('/', signInController.signInEmailAndPassword);

module.exports = router;
