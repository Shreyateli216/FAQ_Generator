const express = require('express');
const router = express.Router();
const Faq = require('../models/Faq');
const protect = require('../middleware/auth');

router.use(protect);

// @route   GET /api/faqs
// @desc    Get all FAQs for current user
// @access  Private
router.get('/', async (req, res, next) => {
  try {
    const { persona, language } = req.query;
    const filter = { user: req.user._id };

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
    const faq = await Faq.findOne({ _id: req.params.id, user: req.user._id });
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
    req.body.user = req.user._id;
    const faq = await Faq.create(req.body);
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
    const { faqs } = req.body;

    const faqsWithUser = faqs.map((faq, index) => ({
      ...faq,
      user: req.user._id,
      order: index
    }));

    const createdFaqs = await Faq.insertMany(faqsWithUser);
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
    let faq = await Faq.findOne({ _id: req.params.id, user: req.user._id });
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
    const faq = await Faq.findOne({ _id: req.params.id, user: req.user._id });
    if (!faq) {
      return res.status(404).json({ success: false, error: 'FAQ not found' });
    }

    await faq.deleteOne();
    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
