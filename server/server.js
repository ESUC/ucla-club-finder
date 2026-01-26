require('dotenv').config();

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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes for the backend
app.use('/api/clubs/', clubRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/userAuth/', userAuthRoutes);

// connect to db
if (!process.env.MONG_URI) {
  console.error('ERROR: MONG_URI is not defined in your .env file');
  console.error('Please create a .env file in the server directory with your MongoDB connection string.');
  console.error('See env.example for the required format.');
  process.exit(1);
}

if (!process.env.PORT) {
  console.error('ERROR: PORT is not defined in your .env file');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db and listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
