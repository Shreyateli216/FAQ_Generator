const express = require('express');
const router = express.Router();
const DriftData = require('../models/DriftData');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/drift
// @desc    Get drift data
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const driftData = await DriftData.find({ user: req.user._id });
    res.json({ success: true, count: driftData.length, data: driftData });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
