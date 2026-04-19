const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/projects
// @desc    Get all projects for user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/projects
// @desc    Create a project
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    req.body.user = req.user._id;
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    await project.deleteOne();
    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
