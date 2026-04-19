const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: {
    type: String,
    required: [true, 'Please provide a question'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer'],
    trim: true
  },
  seoScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  seoSuggestions: [String],
  persona: {
    type: String,
    enum: ['nora', 'sam', 'paul'],
    default: 'nora'
  },
  language: {
    type: String,
    enum: ['en', 'hi', 'mr'],
    default: 'en'
  },
  intent: {
    type: String,
    default: 'General'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying by user
faqSchema.index({ user: 1, language: 1 });

module.exports = mongoose.model('Faq', faqSchema);
