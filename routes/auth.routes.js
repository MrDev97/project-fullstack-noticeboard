const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

router.post('/auth/register', imageUpload.single('avatar'), auth.register);

router.post('/auth/login', auth.login);

router.post('/auth/logout', authMiddleware, auth.logout);

router.get('/auth/user', authMiddleware, auth.getUser);

module.exports = router;
