const mongoose = require('mongoose');

const DriftDataSchema = new mongoose.Schema({
  persona: {
    type: String,
    required: true
  },
  metric: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  trend: {
    type: String,
    enum: ['up', 'down', 'flat'],
    default: 'flat'
  },
  history: [{
    date: { type: String },
    value: { type: Number }
  }],
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

module.exports = mongoose.model('DriftData', DriftDataSchema);
