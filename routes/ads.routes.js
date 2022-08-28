const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUpload');

const ad = require('../controllers/ads.controller');

router.get('/ads', ad.getAll);

router.get('/ads/:id', ad.getOne);

router.post('/ads', authMiddleware, imageUpload.single('image'), ad.postOne);

router.delete('/ads/:id', authMiddleware, ad.deleteOne);

router.put(
  '/ads/:id',
  authMiddleware,
  imageUpload.single('image'),
  ad.putOne
);

router.get('/ads/search/:searchPhrase', ad.searchByTitle);

module.exports = router;
