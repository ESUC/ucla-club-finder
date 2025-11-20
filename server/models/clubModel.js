const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clubSchema = new Schema(
  {
    abbreviation: {
      type: String,
      required: true,
    },
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
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', clubSchema);
