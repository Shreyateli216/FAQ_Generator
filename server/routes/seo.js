const express = require('express');
const router = express.Router();
const SeoData = require('../models/SeoData');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/seo
// @desc    Get SEO data
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.projectId) {
      filter.projectId = req.query.projectId;
    }
    const seoData = await SeoData.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: seoData.length, data: seoData });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/seo
// @desc    Create SEO data
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const seoData = await SeoData.create(req.body);
    res.status(201).json({ success: true, data: seoData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
