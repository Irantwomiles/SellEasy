const express = require('express');
const postRouter = express.Router();
const Tokens = require('../models/Tokens');
const Posts = require('../models/Posts');

postRouter.post('/create', function(req, res) {
    // Make sure user is logged in
    // Create Post

    

    Tokens.find({email: email, token: token}, (error, result) => {
        if(error) return false;

        if(result.length > 0) {
            console.log("this ran");
            return true;
        }

        console.log("now this")
        return false;
    });
  
})

postRouter.post('/delete/:id', function(req, res) {

})

postRouter.get('/get/:id', function(req, res) {

})

module.exports = postRouter;