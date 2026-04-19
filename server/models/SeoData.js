const mongoose = require('mongoose');

const SeoDataSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  },
  readability: {
    type: Number,
    required: true
  },
  keywords: {
    type: Number,
    required: true
  },
  metaScore: {
    type: Number,
    required: true
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('SeoData', SeoDataSchema);
