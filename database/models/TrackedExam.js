const mongoose = require('mongoose');

const TrackedExamSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    examId: {
      type: String,
      required: true,
      index: true,
    },
    examName: {
      type: String,
      required: true,
      trim: true,
    },
    examDate: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['upcoming', 'preparing', 'appeared', 'completed'],
      default: 'upcoming',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.TrackedExam || mongoose.model('TrackedExam', TrackedExamSchema);
