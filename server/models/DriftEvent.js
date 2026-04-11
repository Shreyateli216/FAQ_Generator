const mongoose = require('mongoose');

const driftEventSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please provide an event title'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  actionNeeded: {
    type: Boolean,
    default: false
  },
  driftScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  status: {
    type: String,
    enum: ['Healthy', 'Warning', 'Critical'],
    default: 'Healthy'
  },
  trendData: {
    labels: [String],
    datasets: [{
      label: String,
      data: [Number],
      borderColor: String,
      backgroundColor: String
    }]
  }
}, {
  timestamps: true
});

driftEventSchema.index({ project: 1, createdAt: -1 });

module.exports = mongoose.model('DriftEvent', driftEventSchema);
