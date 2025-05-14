const express = require('express');
const router = express.Router();
const scraperService = require('../services/scraper.service');
const filterService = require('../services/filter.service');

// Middleware to handle async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const entries = await scraperService.fetchHNNews();
    res.json(entries);
  })
);

router.get(
  '/filter/long-titles',
  asyncHandler(async (req, res) => {
    const entries = await scraperService.fetchHNNews();
    const filtered = filterService.filterLongTitles(entries);
    res.json(filtered);
  })
);

router.get(
  '/filter/short-titles',
  asyncHandler(async (req, res) => {
    const entries = await scraperService.fetchHNNews();
    const filtered = filterService.filterShortTitles(entries);
    res.json(filtered);
  })
);

module.exports = router;