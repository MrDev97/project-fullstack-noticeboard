const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const auth = require('../controllers/auth.controller');

router.post('/auth/register', auth.register);

router.post('/auth/login', auth.login);

router.post('/auth/logout', authMiddleware, auth.logout);

router.get('/auth/user', authMiddleware, auth.getUser);

module.exports = router;
