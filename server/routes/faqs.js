const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');
const Project = require('../models/Project');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/faqs
// @desc    Get FAQs with optional filters: projectId, persona, language
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const { projectId, persona, language } = req.query;
    const filter = {};

    if (projectId) {
      // Verify project belongs to user
      const project = await Project.findOne({ _id: projectId, user: req.user._id });
      if (!project) {
        return res.status(404).json({ success: false, error: 'Project not found' });
      }
      filter.project = projectId;
    } else {
      // If no projectId, get FAQs for all user's projects
      const userProjects = await Project.find({ user: req.user._id }).select('_id');
      filter.project = { $in: userProjects.map(p => p._id) };
    }

    if (persona) filter.persona = persona;
    if (language) filter.language = language;

    const faqs = await Faq.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, count: faqs.length, data: faqs });
  } catch (err) {
    next(err);
  }
});

// @route   GET /api/faqs/:id
// @desc    Get single FAQ
// @access  Private
router.get('/:id', async (req, res, next) => {
  try {
    const faq = await Faq.findById(req.params.id).populate('project');
    if (!faq) {
      return res.status(404).json({ success: false, error: 'FAQ not found' });
    }
    res.json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/faqs
// @desc    Create a FAQ
// @access  Private
router.post('/', async (req, res, next) => {
  try {
    // Verify project belongs to user
    const project = await Project.findOne({ _id: req.body.project, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const faq = await Faq.create(req.body);

    // Update project FAQ count
    const faqCount = await Faq.countDocuments({ project: project._id });
    await Project.findByIdAndUpdate(project._id, { faqsCount: faqCount });

    res.status(201).json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
});

// @route   POST /api/faqs/bulk
// @desc    Bulk create FAQs
// @access  Private
router.post('/bulk', async (req, res, next) => {
  try {
    const { projectId, faqs } = req.body;

    // Verify project
    const project = await Project.findOne({ _id: projectId, user: req.user._id });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    // Add project reference to each FAQ
    const faqsWithProject = faqs.map((faq, index) => ({
      ...faq,
      project: projectId,
      order: index
    }));

    const createdFaqs = await Faq.insertMany(faqsWithProject);

    // Update project FAQ count
    const faqCount = await Faq.countDocuments({ project: projectId });
    await Project.findByIdAndUpdate(projectId, { faqsCount: faqCount });

    res.status(201).json({ success: true, count: createdFaqs.length, data: createdFaqs });
  } catch (err) {
    next(err);
  }
});

// @route   PUT /api/faqs/:id
// @desc    Update a FAQ
// @access  Private
router.put('/:id', async (req, res, next) => {
  try {
    let faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, error: 'FAQ not found' });
    }

    faq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: faq });
  } catch (err) {
    next(err);
  }
});

// @route   DELETE /api/faqs/:id
// @desc    Delete a FAQ
// @access  Private
router.delete('/:id', async (req, res, next) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ success: false, error: 'FAQ not found' });
    }

    const projectId = faq.project;
    await faq.deleteOne();

    // Update project FAQ count
    const faqCount = await Faq.countDocuments({ project: projectId });
    await Project.findByIdAndUpdate(projectId, { faqsCount: faqCount });

    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
