const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');

authRouter.post('/login', function(req, res) {

    // Handle user login here
    // Return 200 if success along with JWT token

    res.send({status: 200, token: "login token-goes-here"});

});

authRouter.post('/logout', function(req, res) {

    // Handle user logout here
    // Return 200 if success and remove JWT token

    res.send({status: 200, token: "logout token-goes-here"});

});

module.exports = authRouter;