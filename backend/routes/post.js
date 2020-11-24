const express = require('express');
const postRouter = express.Router();
const { jwtSecret } = require('../utils');
const jwt = require('jsonwebtoken');
const Tokens = require('../models/Tokens');
const Posts = require('../models/Posts');

postRouter.post('/create', authenticateToken, function(req, res) {

    let email = req.user.email;
    let title = req.body.title;
    let description = req.body.description;
    let items = req.body.items;
    let zip = req.body.zip;
    
    if(email && title && description && items && zip) {
        
        let createdAt = new Date().getTime();
        
        let post = new Posts({
            email: email,
            title: title,
            description: description,
            items: items,
            zip: zip,
            createdAt: createdAt,
            comments: []
        })

        post.save(function(error, doc) {
            if(error) {
                return res.send({status: 401, message: "error while creating new post"});
            }

            res.send({status: 201, data: {email: email, title: title, description: description, items: items, zip: zip, createdAt: createdAt, id: doc.id}, message: "new post created successfully!"});
            return;
        })

    } else {
        return res.send({status: 401, message: "invalid values for create route"});
    }
  
})

postRouter.post('/delete/:id', authenticateToken, function(req, res) {

    let id = req.params.id;
    let email = req.user.email;

    Posts.deleteOne({_id: id, email: email}, (err) => {
        if(err) res.sendStatus(403);

        Posts.find({email: email}, (error, result) => {
            if(error) return res.sendStatus(500);

            res.send({data: result});
        })
    });


})

postRouter.get('/get/:id', function(req, res) {
    
    let id = req.params.id;

    if(id) {
        Posts.find({_id: id}, (error, result) => {
            if(error) return res.sendStatus(500);

            if(result.length > 0) {
                res.send({data: result[0], message: "post found."});
            } else {
                res.sendStatus(404);
            }    
        })

    } else {
        res.sendStatus(400);
        return;
    }
})

postRouter.get('/search', function(req, res) {
    
    let search = req.query.search;

    if(search) {
        Posts.find({"items.name": {"$regex": search, "$options": "i"}}, (error, result) => {
            if(error) {
                return res.sendStatus(500);
            }

            res.send(result);   
        }).limit(10);

    } else {
        res.sendStatus(400);
        return;
    }
})

postRouter.get('/latest/:zipcode', function(req, res) {
    
    let zipcode = req.params.zipcode;

    if(zipcode) {
        if(Number.parseInt(zipcode) !== -1) {
            Posts.find({zip: Number.parseInt(zipcode)}, null, {sort: {createdAt: -1}}, (error, result) => {
                if(error) return res.send({status: 500, message: "error while fetching latest posts"});
    
                res.send(result);
    
            }).limit(100);
        } else {
            Posts.find({}, null, {sort: {createdAt: -1}}, (error, result) => {
                if(error) return res.send({status: 500, message: "error while fetching latest posts"});
    
                res.send(result);
    
            }).limit(100);
        }
        
    } else {
        res.send({status: 400, message: "missing zipcode"});
        return;
    }

    

})

postRouter.get('/user', function(req, res) {
    
    let email = req.query.email;

    if(email) {
        Posts.find({email: email}, (error, result) => {

            if(error) return res.send({status: 500, message: "error while fetching post by id"});

            if(result.length > 0) {
                res.send({status: 200, data: result});
            } else {
                res.send({status: 404, message: "no post found by that email."});
            }    
        })

    } else {
        res.send({status: 400, message: "missing email param"});
        return;
    }
})

postRouter.post('/update', authenticateToken, function(req, res) {
    
    let user = req.user.email;
    let doc = req.body.data

    if(doc && user && doc.email === user) {

        Posts.findOneAndUpdate({_id: doc._id}, {items: doc.items}, {new: true}, (err, data) => {
            if(err) return res.sendStatus(500);
            res.send(data);
        })

    } else {
        res.sendStatus(400);
        return;
    }
})

postRouter.post('/comments', authenticateToken, function(req, res) {
    
    let user = req.user.email;
    let doc = req.body.data

    if(doc && user) {

        Posts.findOneAndUpdate({_id: doc._id}, {comments: doc.comments}, {new: true}, (err, data) => {
            if(err) return res.sendStatus(500);
            res.send(data);
        })

    } else {
        res.sendStatus(400);
        return;
    }
})

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
                res.sendStatus(403);
                return;
            }
        })
    })
}

module.exports = postRouter;