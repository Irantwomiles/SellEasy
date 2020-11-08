const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils');
const authRouter = express.Router();
const User = require('../models/User');

authRouter.post('/login', function(req, res) {

    // Handle user login here
    // Return 200 if success along with JWT token

    let email = req.body.email;
    let password = req.body.password;

    User.find({email: email}, (err, result) => {

        if(result.length <= 0) {
            res.send({status: 403, message: "username and/or password was incorrect."});
            return;
        }

        if(err) {
            res.send({status: 403, message: "error occured while authenticating."});
            return;
        }

        let user = result[0];

        bcrypt.compare(password, user.password, (err, matched) => {
            if(err) {
                res.send({status: 403, message: "error while checking credentials."});
                return;
            }

            if(matched) {

                let user = { email: email };
                let token = jwt.sign(user, jwtSecret());

                res.send({status: 200, token: token, message: "logged in."});
                return;
            } else {
                res.send({status: 403, message: "username and/or password was incorrect."});
                return;
            }
        })

    })

});

authRouter.post('/logout', autheticateToken, function(req, res) {

    // Handle user logout here
    // Return 200 if success and remove JWT token

    // We now have access to req.user from jwt

    res.send({status: 200, token: "logout token-goes-here"});

});

function autheticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret(), (error, user) => {
        if(err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

module.exports = authRouter;