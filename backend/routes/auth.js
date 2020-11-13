const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../utils');
const authRouter = express.Router();
const User = require('../models/User');
const Tokens = require('../models/Tokens');

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

                Tokens.find({email: email}, (err, result) => {
                    if(err) {
                        res.send({status: 500, message: "server error."});
                        return;
                    }

                    //User is already logged in
                    if(result.length > 0) {
                        res.send({email: result[0].email, token: result[0].token});
                        return;
                    } else {
                        let user = { email: email };
                        let token = jwt.sign(user, jwtSecret());
        
                        let newToken = new Tokens({
                            email: email,
                            token: token
                        })
        
                        newToken.save(function(err) {
                            if(err) {
                                res.send({status: 500, message: "error while creating login token."});
                                return;
                            }
                            
                            res.send({status: 200, token: token, message: "logged in 2."});
                            return;
                        })
                    }
                });

            } else {
                res.send({status: 403, message: "username and/or password was incorrect."});
                return;
            }
        })

    })

});

authRouter.get('/authenticated', function(req, res) {

    let email = req.query.email;
    let token = req.query.token;

    if(!email && !token) {
        res.sendStatus(403);
        return;
        // ( . ) ( . )
    }

    Tokens.find({email: email, token: token}, (err, result) => {
        if(err) {
            res.send({status: 500, message: "server error."});
            return;
        }

        //User is already logged in
        if(result.length > 0) {
            res.send({email: result[0].email, token: result[0].token});
            return;
        } else {
            res.sendStatus(403);
            return;
        }
    });
})

authRouter.post('/logout', authenticateToken, function(req, res) {

    // Handle user logout here
    // Return 200 if success and remove JWT token

    // We now have access to req.user from jwt

    let token = req.token;
    let email = req.user.email;

    Tokens.find({email: email, token: token}, (err, result) => {
        if(err) return res.sendStatus(500);

        if(result.length > 0) {
            Tokens.deleteMany({email: email, token: token}, (err1, result1) => {
                if(err1) return res.sendStatus(500);
        
                console.log("Result1: ", result1);

                res.send({status: 200, message: "logged out successfully"});
                return;
            })
        } else {
            res.send({status: 403, message: "you can't do that"});
            return;
        }
    })

   

});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret(), (error, user) => {
        if(error) return res.sendStatus(403);

        Tokens.find({email: user.email, token: token}, (err, result) => {
            if(err) return res.sendStatus(500);

            if(result.length > 0) {
                req.user = user;
                req.token = token;
                next();
            } else {
                res.send({status: 403, message: "You are not logged in"});
                return;
            }
        })
    })
}

module.exports = authRouter;