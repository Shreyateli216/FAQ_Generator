const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  language: {
    type: String,
    default: 'en'
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
    default: 'dark'
  },
  autoSync: {
    type: Boolean,
    default: true
  },
  notifications: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Setting', SettingSchema);
