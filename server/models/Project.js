const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a project name']
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'active'
  },
  faqCount: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Project', ProjectSchema);
