const mongoose = require('mongoose');

const QuizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    answers: [
      {
        question: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
        choiceText: {
          type: String,
          required: true,
        },
      },
    ],
    analysisText: {
      type: String,
      required: true,
    },
    recommendedStreams: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
