
const express = require('express')
const bcrypt = require('bcrypt');
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

const validPassword = (password) => { //checks that password conditions met
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    return valid.test(password);
}

router.post('/auth/register', async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    
    if (!validPassword(password)) {
        return res.status(500).json({ error: "Invalid Passcode" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); //hashes the password
    console.log(hash);

    try { 
        const user = await User.create({firstName, lastName, email, password: hash});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    //res.json({mssg: 'registered a user'})
})

router.post('/auth/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (user) {
        console.log(user);
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            res.status(200).json("Correct!");
        } else {
            res.status(400).json({error: error.message});
        }
    } else {
        res.json("No record existed");
    }
})

module.exports = router;