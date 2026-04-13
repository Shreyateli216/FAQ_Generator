const express = require('express');
const router = express.Router();
const DriftEvent = require('../models/DriftEvent');
const Project = require('../models/Project');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/drift?projectId=
// @desc    Get drift events for a project, or all drift data for user
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

    const events = await DriftEvent.find(filter).sort({ createdAt: -1 }).limit(20);

    // Calculate aggregated drift info
    const latestEvent = events[0];
    const driftData = {
      lastDriftScan: latestEvent ? latestEvent.createdAt : null,
      driftScore: latestEvent ? latestEvent.driftScore : 0,
      status: latestEvent ? latestEvent.status : 'Healthy',
      recentEvents: events.map(e => ({
        id: e._id,
        date: e.createdAt,
        title: e.title,
        description: e.description,
        actionNeeded: e.actionNeeded
      })),
      trendChart: latestEvent && latestEvent.trendData ? latestEvent.trendData : {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Semantic Drift Index',
          data: [0, 0, 0, 0, 0, 0, 0],
          borderColor: '#A855F7',
          backgroundColor: 'rgba(168, 85, 247, 0.2)'
        }]
      }
    };

    res.json({ success: true, data: driftData });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/drift
// @desc    Create a drift event
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    const { projectId } = req.body;
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    req.body.project = projectId;
    const event = await DriftEvent.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
