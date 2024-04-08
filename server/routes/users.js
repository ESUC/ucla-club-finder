const express = require('express')
const User = require('../models/userModel')

const router = express.Router()

// GET all clubs
// router.get('/', (req, res) => {
//     res.json({mssg: 'GET all clubs'})
// })

// // GET a single club
// router.get('/:id', (req, res) => {
//     res.json({mssg: 'GET a single club'})
// })
// POST a new club
router.post('/auth/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    
    try { 
        const user = await User.create({firstName, lastName, email, password})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    //res.json({mssg: 'registered a user'})
})

router.post('/auth/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email: email});
    console.log(user.password)
    if (user) {
        if (user.password === password) {
            res.json("Success")
        } else {
            res.json("the password is incorrect")
        }
    } else {
        res.json("No record existed")
    }
})

module.exports = router