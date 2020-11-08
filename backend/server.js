require('dotenv').config();

require('./database');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', authRouter);
app.use('/api', userRouter);

app.post('/', function(req, res) {
    res.sendStatus(200);
})

app.get('/api', function(req, res) {
    res.send("Nothing here, move along!");
})

app.listen(5000, () => console.log("Server started on port 5000"));