const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['exam', 'application', 'result', 'general'],
      default: 'general',
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Reminder || mongoose.model('Reminder', ReminderSchema);
