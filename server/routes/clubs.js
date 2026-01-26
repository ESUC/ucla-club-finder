const express = require('express');
const Club = require('../models/clubModel');

const router = express.Router();

// GET all clubs
router.get('/', async (req, res) => {
  try{
    const clubs = await Club.find({});
    res.status(200).json(clubs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET a single club by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const club = await Club.findById(id);
    if (!club) {
      return res.status(400).json({ error: 'No club detected' });
    }
    res.status(200).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// POST a new club
router.post('/', async (req, res) => {
  const { abbreviation, clubName, clubType, major, meetingDays, size, description, img } = req.body;

  try {
    const club = await Club.create({ abbreviation, clubName, clubType, major, meetingDays, size, description, img });
    res.status(200).json({ message: "Club successfully created"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a single club by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const club = await Club.findById(id);
    if (!club) {
      return res.status(400).json({ error: 'No club detected' });
    }
    await club.remove();
    res.status(200).json({ message: "Club successfully deleted"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
