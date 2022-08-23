const express = require('express');
const router = express.Router();

const ad = require('../controllers/ads.controller');

router.get('/ads', ad.getAll);

router.get('/ads/:id', ad.getOne);

router.post('/ads', ad.postOne);

router.delete('/ads/:id', ad.deleteOne);

router.put('/api/ads/:id', ad.putOne);

router.get('/ads/search/:searchPhrase', ad.searchByTitle);

module.exports = router;
