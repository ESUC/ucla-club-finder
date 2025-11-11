require('dotenv').config();
const fs = require('fs');
const { MongoClient } = require('mongodb');

const uri = process.env.MONG_URI;
const dbName = 'ClubFinder';
const collectionName = 'clubs';

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const data = fs.readFileSync('output.txt', 'utf-8');

    // Parse club names from the file
    const clubNames = data
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const clubDocs = clubNames.map((name) => ({ name }));

    // Insert all club documents into the collection
    const result = await db.collection(collectionName).insertMany(clubDocs);

    console.log(`Inserted ${result.insertedCount} clubs into collection "${collectionName}".`);
  } catch (err) {
    console.error('Error uploading clubs:', err);
  } finally {
    await client.close();
  }
}

main();
