require('dotenv').config();

require('./database');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

const app = express();

//check and make sure port is working
const PORT = process.env.PORT;

console.log(PORT)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));
}

app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api/post', postRouter);

app.post('/', function(req, res) {
    res.sendStatus(200);
})

app.get('/api', function(req, res) {
    res.send("Nothing here, move along!");
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));