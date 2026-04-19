const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Faq = require('../models/Faq');

// @route   POST /api/seed
// @desc    Seed database with simple demo data (user + FAQs)
// @access  Public
router.post('/', async (req, res, next) => {
  try {
    const isForce = req.query.force === 'true';

    // 1. Get or Create demo user
    let user = await User.findOne({ email: 'demo@faqgenie.com' });

    if (user && !isForce) {
      const faqCount = await Faq.countDocuments({ user: user._id });
      if (faqCount > 0) {
        return res.status(400).json({
          success: false,
          error: 'Data already exists. Use ?force=true to reset.',
          summary: { faqs: faqCount }
        });
      }
    }

    if (isForce && user) {
      await Faq.deleteMany({ user: user._id });
    }

    if (!user) {
      user = await User.create({
        name: 'Demo User',
        email: 'demo@faqgenie.com',
        password: 'demo123456'
      });
    }

    // 2. Simple FAQs with SEO scores
    const demoFaqs = [
      {
        user: user._id,
        question: "What is the return policy?",
        answer: "You can return any product within 30 days of purchase with a valid receipt.",
        seoScore: 95,
        seoSuggestions: ["Keep it up!", "Excellent use of keywords"],
        persona: 'nora', language: 'en', intent: 'General'
      },
      {
        user: user._id,
        question: "How do I track my order?",
        answer: "Visit our tracking page and enter your order ID to see real-time updates.",
        seoScore: 88,
        seoSuggestions: ["Add more context about shipping methods"],
        persona: 'nora', language: 'en', intent: 'General'
      },
      {
        user: user._id,
        question: "Is there a student discount?",
        answer: "Yes, students get 15% off with a valid UNiDAYS verification.",
        seoScore: 45,
        seoSuggestions: ["Too short, add more keywords", "Use 'discount' more naturally"],
        persona: 'nora', language: 'en', intent: 'General'
      },
      {
        user: user._id,
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login screen and follow the email link.",
        seoScore: 91,
        seoSuggestions: ["Great readability"],
        persona: 'sam', language: 'en', intent: 'Security'
      }
    ];

    await Faq.insertMany(demoFaqs);

    res.status(201).json({
      success: true,
      message: 'Simplified database seeded successfully!',
      summary: {
        users: 1,
        faqs: demoFaqs.length
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
