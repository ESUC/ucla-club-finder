const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');

// express app
const app = express();
const clubRoutes = require('./routes/clubs');
const userRoutes = require('./routes/users');
const userAuthRoutes = require('./routes/userAuth');
const mongoose = require('mongoose');

//middleware
app.use(express.json());
app.use(cors());

// routes for the backend
app.use('/api/clubs/', clubRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/userAuth/', userAuthRoutes);

// Load env from server directory and trim (avoids "not defined" when run from other folders)
const MONGO_URI = process.env.MONGO_URI?.trim();
const PORT = (process.env.PORT && process.env.PORT.trim()) || '4000';

if (!MONGO_URI) {
  console.error('ERROR: MONGO_URI is not defined in your .env file');
  console.error('Create server/.env with MONGO_URI=your-atlas-connection-string (use MONGO_URI with an O).');
  process.exit(1);
}

// Allow app to run without MongoDB: clubs will be served from server/clubs.json
app.locals.useClubsFallback = false;

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 })
  .then(() => {
    app.locals.useClubsFallback = false;
    app.listen(PORT, () => {
      console.log('Connected to MongoDB and listening on port', PORT);
    });
  })
  .catch((error) => {
    console.error('\n--- MongoDB connection failed ---');
    console.error(error.message);
    if (error.message.includes('whitelist')) {
      console.error('\n→ Atlas: Network Access → IP Access List → add your IP or 0.0.0.0/0');
    } else {
      console.error('\n→ Check: cluster not paused, correct username/password in .env, Database Access permissions.');
    }
    console.error('\n→ Starting server anyway: clubs will be served from server/clubs.json');
    console.error('---\n');
    app.locals.useClubsFallback = true;
    app.listen(PORT, () => {
      console.log('Server listening on port', PORT, '(no database)');
    });
  });
