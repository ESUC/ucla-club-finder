const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

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

const validateYear = (year) => {
  if (!/^(2026|2027|2028|2029)$/.test(year)) {
    return 1;
  }
  return 0;
}

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.patch("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const allowed = ["firstName", "lastName", "username", "major", "year", "bio", "profilePicture"];
    const updates = {};
    console.log("PATCH username:", req.body.username);

    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const errors = {};

    if ("firstName" in updates && !String(updates.firstName).trim()) {
      errors.firstName = "Please enter first name";
    }

    if ("lastName" in updates && !String(updates.lastName).trim()) {
      errors.lastName = "Please enter last name";
    }

    if ("username" in updates) {
      if (!String(updates.username).trim()) {
        errors.username = "Username is required.";
      } else if (!/^[a-zA-Z0-9_]{3,20}$/.test(updates.username)) {
        errors.username = "Username must be 3–20 characters, letters, numbers, or underscores.";
      }
    }

    if ("major" in updates && !String(updates.major).trim()) {
      errors.major = "Please enter major";
    }

    if ("year" in updates && validateYear(updates.year)) {
      errors.year = "Please enter a valid graduation year";
    }

    if ("bio" in updates && updates.bio.length > 300) {
      errors.bio = "Bio must be under 300 characters.";
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ errors: { general: "No fields provided to update." } });
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }


    // username must be unique
    const updated = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");


    if (!updated) return res.status(404).json({ message: "User not found" });

    return res.json(updated);
  } catch (err) {
    // handle duplicates
    if (err?.code === 11000) {
      return res.status(400).json({ errors: { username: "That username is already taken." } });
    }
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});


router.post('/auth/register', async (req, res) => {
  console.log("REGISTER BODY:", req.body);
  const { firstName, lastName, username, email, password, year, major } = req.body;
  const errors = {};

  if (!email || (!email.endsWith('@ucla.edu') && !email.endsWith('@g.ucla.edu'))) {
    errors.email = 'You must register with a UCLA email.';
  }
  if (!year || validateYear(year)) {
    errors.year = "Please enter a valid graduation year";
  }
  if (!firstName) {
    errors.firstName = "Please enter first name"
  }
  if (!lastName) {
    errors.lastName = "Please enter last name"
  }
  if (!major) {
    errors.major = "Please enter major"
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
  const hash = bcrypt.hashSync(password, salt); //hashes the password


  try {
    const user = await User.create({ firstName, lastName, username, email, password: hash, year, major });
    res.status(200).json(user);
  } catch (error) {
    if (error.code === 11000) {
      const dupField = Object.keys(error.keyValue)[0]; //email or username is in database
      return res.status(400).json({ errors: { [dupField]: `${dupField} already exists` } });
    }
    res.status(400).json({ error: "Incorrect password" });
  }
  //year validation
  //major should be a drop down
  //update the reasong for password fail/ specs for correct pasword
  //res.json({mssg: 'registered a user'})
});
router.post("/auth/login", async (req, res) => {
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

    console.log("LOGIN SUCCESS ✅");

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        major: user.major,
        profilePic: user.profilePic, // only if you have it
      },
    });


  } catch (err) {
    console.error("LOGIN ERROR 💥", err);
    return res.status(500).json({ errors: { general: "Server error." } });
  }
});

router.get('/saved/:userId', async (req, res) => {
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
  const { clubId } = req.params;
  const { userId } = req.body;
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
  const { clubId } = req.params;
  const { userId } = req.body;
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
