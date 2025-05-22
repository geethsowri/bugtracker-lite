const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true // 'created_bug', 'updated_bug', 'resolved_bug', etc.
  },
  bug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bug'
  },
  details: {
    type: String
  }
}, {
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;