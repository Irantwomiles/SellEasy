const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');

userRouter.post('/create', function(req, res) {

    // Create a user here
    res.send({status: 200, token: "create user goes here"});

});

userRouter.post('/delete', function(req, res) {

    // Create a user here
    res.send({status: 200, token: "delete user goes here"});

});

module.exports = userRouter;