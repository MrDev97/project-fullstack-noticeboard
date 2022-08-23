const express = require('express');
const router = express.Router();
const Ad = require('../models/ad.model');

router.get('/ads', async (req, res) => {
  try {
    res.json(await Ad.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;