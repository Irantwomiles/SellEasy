const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const User = require('../models/User');

userRouter.post('/create', function(req, res) {

    /**
     * Rate limit based on IP to prevent spamming
     */

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    if(firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0) {
        res.send({status: 401, message: "all fields must be filled out."});
        return;
    }

    /**
     * Hash the password
     */

    User.find({email: email}, (err, result) => {

        if(result.length > 0) {
            res.send({status: 401, message: "a user with that email already exists."});
            return;
        }

        bcrypt.hash(password, 10, (err, hash) => {
            
            let user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            });
    
            user.save(function(err) {
                if(err) {
                    res.send({status: 401, message: "error while creating user."});
                    return;
                }
    
                res.send({status: 200, message: "user created successfully."})
            })
        })

    })


});

userRouter.post('/delete', function(req, res) {

    // Create a user here
    res.send({status: 200, token: "delete user goes here"});

});

module.exports = userRouter;