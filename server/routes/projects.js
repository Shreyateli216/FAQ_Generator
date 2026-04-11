const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const protect = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @route   GET /api/projects
// @desc    Get all projects for current user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Private
router.get('/:id', async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    req.body.user = req.user._id;

    // Assign a random thumbnail color
    const colors = ['bg-cyan-500', 'bg-violet-500', 'bg-green-500', 'bg-amber-500', 'bg-rose-500', 'bg-blue-500'];
    if (!req.body.thumbnail) {
      req.body.thumbnail = colors[Math.floor(Math.random() * colors.length)];
    }

    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', async (req, res, next) => {
  try {
    let project = await Project.findOne({ _id: req.params.id, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: project });
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
