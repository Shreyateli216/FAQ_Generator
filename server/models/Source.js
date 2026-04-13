const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  type: {
    type: String,
    enum: ['file', 'url', 'notion', 'github', 'api', 'sitemap'],
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a source name'],
    trim: true
  },
  url: {
    type: String,
    default: ''
  },
  filePath: {
    type: String,
    default: ''
  },
  fileSize: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['ready', 'processing', 'done', 'error'],
    default: 'ready'
  },
  extractedText: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

sourceSchema.index({ project: 1 });

module.exports = mongoose.model('Source', sourceSchema);
