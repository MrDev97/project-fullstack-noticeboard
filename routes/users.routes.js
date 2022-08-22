const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/users', async (req, res) => {
  try {
    res.json(await User.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
