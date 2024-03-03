require ('dotenv').config()

const express = require('express')

// express app
const app = express()
const clubRoutes = require('./routes/clubs')
const mongoose = require('mongoose')

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes
app.use('/api/clubs/', clubRoutes);

// connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
