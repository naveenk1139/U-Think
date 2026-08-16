const mongoose = require('mongoose');

const SavedPathwaySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    specId: {
      type: String,
      required: true,
      index: true,
    },
    specName: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.SavedPathway || mongoose.model('SavedPathway', SavedPathwaySchema);
