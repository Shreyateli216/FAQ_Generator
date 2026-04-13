const express = require('express');
const router = express.Router();
const SeoReport = require('../models/SeoReport');
const Project = require('../models/Project');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/seo?projectId=
// @desc    Get SEO report for a project, or latest for user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let filter = {};

    if (projectId) {
      const project = await Project.findOne({ _id: projectId, user: req.user._id });
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      filter.project = projectId;
    } else {
      const userProjects = await Project.find({ user: req.user._id }).select('_id');
      filter.project = { $in: userProjects.map(p => p._id) };
    }

    const report = await SeoReport.findOne(filter).sort({ createdAt: -1 });

    if (!report) {
      // Return default data if no report exists
      return res.json({
        success: true,
        data: {
          score: 0,
          metrics: { keywordDensity: 0, readability: 0, schemaCompleteness: 0, userIntent: 0 },
          suggestions: []
        }
      });
    }

    res.json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/seo
// @desc    Create/update SEO report for a project
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    req.body.project = projectId;
    const report = await SeoReport.create(req.body);

    // Update project SEO score
    if (req.body.score) {
      await Project.findByIdAndUpdate(projectId, { seoScore: req.body.score });
    }

    res.status(201).json({ success: true, data: report });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
