const express = require('express');
const bcrypt = require('bcrypt');
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
                res.send({status: 200, token: "JWT Token Here", message: "logged in."});
                return;
            } else {
                res.send({status: 403, message: "username and/or password was incorrect."});
                return;
            }
        })

    })

});

authRouter.post('/logout', function(req, res) {

    // Handle user logout here
    // Return 200 if success and remove JWT token

    res.send({status: 200, token: "logout token-goes-here"});

});

module.exports = authRouter;