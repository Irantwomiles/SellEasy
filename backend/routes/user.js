const express = require('express');
const bcrypt = require('bcrypt');
const userRouter = express.Router();
const User = require('../models/User');
const Tokens = require('../models/Tokens');

userRouter.post('/create', function(req, res) {

    /**
     * Rate limit based on IP to prevent spamming
     */

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let zip = req.body.zip;

    if(firstName.length === 0 || lastName.length === 0 || email.length === 0 || password.length === 0 || zip.length === 0) {
        res.sendStatus(401)
        return;
    }

    User.find({email: email}, (err, result) => {

        if(result.length > 0) {
            res.sendStatus(401);
            return;
        }

        bcrypt.hash(password, 10, (err, hash) => {
            
            let user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                zip: Number.parseInt(zip)
            });
    
            user.save(function(err) {
                if(err) {
                    res.sendStatus(401);
                    return;
                }
    
                res.sendStatus(200);
            })
        })

    })


});

userRouter.post('/delete', function(req, res) {

    // Delete a user here
    res.send({status: 200, token: "delete user goes here"});

});

module.exports = userRouter;