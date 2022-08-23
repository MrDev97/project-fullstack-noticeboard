const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');

router.get('/users', user.getAll);

router.get('/users/:id', user.getOne);

module.exports = router;
