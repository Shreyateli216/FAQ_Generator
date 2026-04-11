const mongoose = require('mongoose');

const seoReportSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  metrics: {
    keywordDensity: { type: Number, default: 0 },
    readability: { type: Number, default: 0 },
    schemaCompleteness: { type: Number, default: 0 },
    userIntent: { type: Number, default: 0 }
  },
  suggestions: [{
    type: {
      type: String,
      enum: ['success', 'warning', 'error', 'info'],
      default: 'info'
    },
    text: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

seoReportSchema.index({ project: 1 });

module.exports = mongoose.model('SeoReport', seoReportSchema);
