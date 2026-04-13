const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
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
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 90
  },
  entities: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
faqSchema.index({ project: 1, persona: 1, language: 1 });

module.exports = mongoose.model('Faq', faqSchema);
