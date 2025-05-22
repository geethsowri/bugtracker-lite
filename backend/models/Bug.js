const mongoose = require('mongoose');
const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  severity: { type: String, enum: ['low', 'medium', 'high'] },
  status: { type: String, enum: ['open', 'resolved'], default: 'open' },
  assignee: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Bug', bugSchema);