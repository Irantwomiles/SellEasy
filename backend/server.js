require('dotenv').config()

require('./database')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

// const postRouter = require('./routes/post')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.use('/api', postRouter)

app.post('/', function(req, res) {
    res.sendStatus(200)
})


app.listen(5000, () => console.log("Server started on port 5000"));