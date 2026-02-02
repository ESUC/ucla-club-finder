const express = require('express');
const path = require('path');
const fs = require('fs');
const Club = require('../models/clubModel');

const router = express.Router();

// Fallback: load clubs from server/clubs.json when MongoDB is unavailable
function getFallbackClubs() {
  try {
    const filePath = path.join(__dirname, '..', 'clubs.json');
    const raw = fs.readFileSync(filePath, 'utf8');
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list.map((c, i) => ({ ...c, _id: c._id || c.abbreviation || String(i) })) : [];
  } catch (e) {
    return [];
  }
}

// GET all clubs
router.get('/', async (req, res) => {
  if (req.app.locals.useClubsFallback) {
    const clubs = getFallbackClubs();
    return res.status(200).json(clubs);
  }
  try {
    const clubs = await Club.find({});
    res.status(200).json(clubs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET a single club by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (req.app.locals.useClubsFallback) {
    const clubs = getFallbackClubs();
    const club = clubs.find((c) => c._id === id || c.abbreviation === id);
    if (!club) return res.status(404).json({ error: 'No club detected' });
    return res.status(200).json(club);
  }
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
  if (req.app.locals.useClubsFallback) {
    return res.status(503).json({ error: 'Database unavailable. Clubs are read from clubs.json.' });
  }
  const { abbreviation, clubName, clubType, major, meetingDays, size, description, img, url } = req.body;
  try {
    const club = await Club.create({ abbreviation, clubName, clubType, major, meetingDays, size, description, img, url });
    res.status(200).json({ message: "Club successfully created"});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a single club by id
router.delete('/:id', async (req, res) => {
  if (req.app.locals.useClubsFallback) {
    return res.status(503).json({ error: 'Database unavailable. Clubs are read from clubs.json.' });
  }
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
