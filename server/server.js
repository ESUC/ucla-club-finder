require ('dotenv').config()

const express = require('express')
const cors = require('cors')

// express app
const app = express()
const clubRoutes = require('./routes/clubs')
const userRoutes = require('./routes/users')
const mongoose = require('mongoose')

//middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
}) 

// routes for the backend
app.use('/api/clubs/', clubRoutes);
app.use('/api/users/', userRoutes);

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
