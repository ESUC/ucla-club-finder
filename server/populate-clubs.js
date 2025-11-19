require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const Club = require('./models/clubModel');

const uri = process.env.MONG_URI;

async function main() {

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const data = JSON.parse(fs.readFileSync('clubs.json', 'utf-8'));
    const result = await Club.insertMany(data);

    console.log(`Club list populated`);
  } catch (err) {
    console.error('Error uploading clubs:', err);
  } finally {
    mongoose.connection.close();
  }
}

main();