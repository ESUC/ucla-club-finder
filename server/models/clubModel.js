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
    /*
    meetingDays: { // dont need
      type: String,
      required: true,
    },
    size: { // dont need
      type: String,
      required: true,
    },
    */
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    // add clubUrl
    url: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Club', clubSchema);
