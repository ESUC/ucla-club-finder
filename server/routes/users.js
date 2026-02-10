const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const router = express.Router();

function isValidObjectId(id) {
  if (!id || typeof id !== 'string') return false;
  return mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;
}

// GET all clubs
// router.get('/', (req, res) => {
//     res.json({mssg: 'GET all clubs'})
// })

// // GET a single club
// router.get('/:id', (req, res) => {
//     res.json({mssg: 'GET a single club'})
// })
// POST a new club

const { validatePassword } = require("../services/validatePassword");

// Return 503 if MongoDB is not connected (avoids 10s buffer timeout)
function requireDb(res) {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      errors: {
        general: "Database unavailable. Check MongoDB connection and Atlas IP whitelist (Network Access).",
      },
    });
    return false;
  }
  return true;
}

const validateYear = (year) => {
  if(!/^(2026|2027|2028|2029)$/.test(year)){
    return 1;
  }
  return 0;
}


router.post('/auth/register', async (req, res) => {
  if (!requireDb(res)) return;
  console.log("REGISTER BODY:", req.body);
  const { firstName, lastName, username, email, password, year, major } = req.body;
  const errors = {};

  if (!email || (!email.endsWith('@ucla.edu') && !email.endsWith('@g.ucla.edu'))) {
    errors.email = 'You must register with a UCLA email.';
  }
  if (!firstName || String(firstName).trim() === '') {
    errors.firstName = "Please enter first name";
  }
  if (!lastName || String(lastName).trim() === '') {
    errors.lastName = "Please enter last name";
  }
  // year/major optional: use defaults if missing so client can omit them
  const yearVal = year && String(year).trim() ? String(year).trim() : 'N/A';
  const majorVal = major && String(major).trim() ? String(major).trim() : 'N/A';
  if (yearVal !== 'N/A' && validateYear(yearVal)) {
    errors.year = "Please enter a valid graduation year (2026–2029)";
  }
  const passwordErrors = validatePassword(password);
  if (passwordErrors.length > 0) {
    return res.status(400).json({
      errors: {
        password: passwordErrors.join(" ")
      }
    });
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user = await User.create({ firstName, lastName, username, email, password: hash, year: yearVal, major: majorVal });
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyValue)[0]; //email or username is in database
      return res.status(400).json({ errors: { [dupField]: `${dupField} already exists` } });
    }
    console.error('REGISTER ERROR', error);
    return res.status(500).json({ errors: { general: error.message || 'Registration failed. Please try again.' } });
  }
  //year validation
  //major should be a drop down
  //update the reasong for password fail/ specs for correct pasword
  //res.json({mssg: 'registered a user'})
});
router.post("/auth/login", async (req, res) => {
  if (!requireDb(res)) return;
  console.log("LOGIN HIT ✅");
  console.log("LOGIN BODY:", req.body);

  try {
    const { email, password } = req.body;
    const errors = {};

    // 1) Basic checks
    if (!email || String(email).trim() === "") {
      errors.email = "Please enter your email.";
    }
    if (!password || String(password).trim() === "") {
      errors.password = "Please enter your password.";
    }

    if (Object.keys(errors).length > 0) {
      console.log("LOGIN STOP 🚫 missing fields", errors);
      return res.status(400).json({ errors });
    }

    // 2) Normalize email (prevents case/space issues)
    const normalizedEmail = String(email).trim().toLowerCase();
    console.log("LOGIN STEP ✅ normalizedEmail:", normalizedEmail);

    // 3) Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("LOGIN STOP 🚫 no user found");
      return res.status(404).json({ errors: { email: "No account found with that email." } });
    }
    console.log("LOGIN STEP ✅ user found:", user._id.toString());

    // 4) Check password
    const passwordMatch = await bcrypt.compare(String(password), user.password);
    if (!passwordMatch) {
      console.log("LOGIN STOP 🚫 wrong password");
      return res.status(400).json({ errors: { password: "Incorrect password." } });
    }

    // 5) Update last sign-in in MongoDB
    user.lastLoginAt = new Date();
    await user.save();

    console.log("LOGIN SUCCESS ✅");
    return res.status(200).json({
      message: "Login successful.",
      userId: user._id.toString(),
      email: user.email || null,
    });
  } catch (err) {
    console.error("LOGIN ERROR 💥", err);
    return res.status(500).json({ errors: { general: "Server error." } });
  }
});

router.get('/profile/:userId', async (req, res) => {
  if (!requireDb(res)) return;
  const { userId } = req.params;
  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  try {
    const user = await User.findById(userId).select('firstName lastName username email pronouns major year bio');
    if (!user) {
      return res.status(404).json({ error: 'No user detected' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/profile/:userId', async (req, res) => {
  if (!requireDb(res)) return;
  const { userId } = req.params;
  const { firstName, lastName, username, email, pronouns, major, year, bio } = req.body;
  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'No user detected' });
    }
    if (firstName != null) user.firstName = String(firstName).trim();
    if (lastName != null) user.lastName = String(lastName).trim();
    if (username != null) user.username = String(username).trim();
    if (email != null) user.email = String(email).trim().toLowerCase();
    if (pronouns != null) user.pronouns = String(pronouns).trim();
    if (major != null) user.major = String(major).trim() || 'N/A';
    if (year != null) user.year = String(year).trim() || 'N/A';
    if (bio != null) user.bio = String(bio).trim();
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyValue)[0];
      return res.status(400).json({ errors: { [dupField]: `${dupField} already in use` } });
    }
    res.status(400).json({ error: error.message });
  }
});

router.get('/saved/:userId', async (req, res) => {
  if (!requireDb(res)) return;
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate('savedClubs');
    if (!user) {
      return res.status(400).json({ error: 'No user detected' });
    }
    res.status(200).json(user.savedClubs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/save/:clubId', async (req, res) => {
  if (!requireDb(res)) return;
  const { clubId } = req.params;
  const { userId } = req.body;
  if (!isValidObjectId(clubId)) {
    return res.status(400).json({ error: 'Invalid club ID' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'No user detected' });
    }
    if (user.savedClubs.some((id) => id.toString() === clubId)) {
      return res.status(400).json({ error: 'Club has already been saved' });
    }
    user.savedClubs.push(clubId);
    await user.save();
    res.status(200).json('Club saved');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/save/:clubId', async (req, res) => {
  if (!requireDb(res)) return;
  const { clubId } = req.params;
  const { userId } = req.body;
  if (!isValidObjectId(clubId)) {
    return res.status(400).json({ error: 'Invalid club ID' });
  }
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'No user detected' });
    }
    if (!user.savedClubs.some((id) => id.toString() === clubId)) {
      return res.status(400).json({ error: 'Club not currently saved' });
    }
    if (user.savedClubs.length === 1) {
      user.set('savedClubs', undefined);
    } else {
      user.savedClubs.pull(clubId);
    }
    await user.save();
    res.status(200).json('Club deleted');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
