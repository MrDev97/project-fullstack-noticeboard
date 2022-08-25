const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.post('/auth/register', auth.register);

router.post('/auth/login', auth.login);

router.get('/auth/user', auth.getUser);

module.exports = router;
