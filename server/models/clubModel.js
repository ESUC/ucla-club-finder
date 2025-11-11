const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    clubName: {
      type: String,
      required: true,
    },
    clubType: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    meetingDays: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', clubSchema);
