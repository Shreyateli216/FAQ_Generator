const express = require('express');
const router = express.Router();
const Source = require('../models/Source');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/sources
// @desc    Get all sources for user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.projectId) {
      filter.projectId = req.query.projectId;
    }
    const sources = await Source.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: sources.length, data: sources });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/sources
// @desc    Create a source
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const source = await Source.create(req.body);
    res.status(201).json({ success: true, data: source });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/sources/:id
// @desc    Delete a source
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    const source = await Source.findOne({ _id: req.params.id, user: req.user._id });
    if (!source) {
      return res.status(404).json({ success: false, error: 'Source not found' });
    }
    await source.deleteOne();
    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
