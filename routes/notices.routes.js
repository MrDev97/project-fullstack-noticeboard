const express = require('express');
const router = express.Router();
const Notice = require('../models/notice.model');

router.get('/notices', async (req, res) => {
  try {
    res.json(await Notice.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;