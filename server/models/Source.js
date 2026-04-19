const mongoose = require('mongoose');

const SourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  type: {
    type: String,
    enum: ['file', 'url', 'notion', 'github', 'api', 'sitemap'],
    required: true
  },
  status: {
    type: String,
    enum: ['ready', 'processing', 'failed'],
    default: 'ready'
  },
  size: {
    type: String,
    default: '0 MB'
  },
  url: {
    type: String
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Source', SourceSchema);
