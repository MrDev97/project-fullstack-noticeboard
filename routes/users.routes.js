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

router.get('/users/:id', async (req, res) => {
  try {
    const usr = await User.findById(req.params.id);
    if (!usr) res.status(404).json({ message: 'Not found' });
    else res.json(usr);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
