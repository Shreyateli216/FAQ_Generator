const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a project name'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Archived'],
    default: 'Draft'
  },
  thumbnail: {
    type: String,
    default: 'bg-cyan-500'
  },
  faqsCount: {
    type: Number,
    default: 0
  },
  seoScore: {
    type: Number,
    default: 0
  },
  sourceUrl: {
    type: String,
    default: ''
  },
  featureDescription: {
    type: String,
    default: ''
  },
  settings: {
    chunkingStrategy: {
      type: String,
      default: 'Semantic (Recommended)'
    },
    languageDetection: {
      type: String,
      default: 'Auto-detect'
    },
    stripBoilerplate: {
      type: Boolean,
      default: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
