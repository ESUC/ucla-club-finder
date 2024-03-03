const express = require('express')
const Club = require('../models/clubModel')

const router = express.Router()

// GET all clubs
router.get('/', (req, res) => {
    res.json({mssg: 'GET all clubs'})
})

// GET a single club
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single club'})
})
// POST a new club
router.post('/', async (req, res) => {
    const {clubName, clubType, major, meetingDays, size} = req.body

    try { 
        const club = await Club.create({clubName, clubType, major, meetingDays, size})
        res.status(200).json(club)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'GET a single clubs'})
})

module.exports = router