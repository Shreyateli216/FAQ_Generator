const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  groqApiKey: {
    type: String,
    default: ''
  },
  privacyMode: {
    type: Boolean,
    default: false
  },
  textEngine: {
    type: String,
    default: 'mistral:latest'
  },
  visionEngine: {
    type: String,
    default: 'llava:7b'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema);
