const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/settings
// @desc    Get user settings
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    let settings = await Setting.findOne({ user: req.user._id });

    // If no settings exist, create default
    if (!settings) {
      settings = await Setting.create({ user: req.user._id });
    }

    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/settings
// @desc    Update user settings
// @access  Private
router.put('/', async (req, res, next) => {
  try {
    let settings = await Setting.findOne({ user: req.user._id });

    if (!settings) {
      req.body.user = req.user._id;
      settings = await Setting.create(req.body);
    } else {
      settings = await Setting.findOneAndUpdate(
        { user: req.user._id },
        req.body,
        { new: true, runValidators: true }
      );
    }

    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
