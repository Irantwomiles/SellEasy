const express = require('express');
const postRouter = express.Router();
const { jwtSecret } = require('../utils');
const jwt = require('jsonwebtoken');
const Tokens = require('../models/Tokens');
const Posts = require('../models/Posts');

postRouter.post('/create', autheticateToken, function(req, res) {
    // Create Post

    let email = req.user.email;
    let description = req.body.description;
    let items = req.body.items;
    let zip = req.body.zip;
    let createdAt = req.body.createdAt;

    if(email && description && items && zip && createdAt) {

        let post = new Posts({
            email: email,
            description: description,
            items: items,
            zip: zip,
            createdAt: new Date().getTime()
        })

        post.save(function(error, doc) {
            if(error) {
                return res.send({status: 401, message: "error while creating new post"});
            }

            res.send({status: 201, data: {email: email, description: description, items: items, zip: zip, createdAt: createdAt, id: doc.id}, message: "new post created successfully!"});
            return;
        })

    }
  
})

postRouter.post('/delete/:id', function(req, res) {

})

postRouter.get('/get/:id', function(req, res) {

})

function autheticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, jwtSecret(), (error, user) => {
        if(error) return res.send({status: 403, message: "Error while authenticating."});

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

module.exports = postRouter;