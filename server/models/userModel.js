const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: { 
      type: String, 
      unique: true, 
      //required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: { 
      type: String, 
      default: '',
    },
    major: { 
      type: String, 
      required: true,
      default: 'N/A'
    },
    year: { 
      type: String, 
      required: true,
      default: 'N/A'
    },
    bio: { 
      type: String, 
      default: '', 
    },
    savedClubs: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Club',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
