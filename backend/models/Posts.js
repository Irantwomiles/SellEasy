const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String},
    title: {type: String},
    description: {type: String},
    items: [{
        name: {type: String},
        price: {type: String},
        sold: {type: Boolean},
        quantity: {type: Number}
    }],
    zip: {type: Number},
    createdAt: {type: Number},
    comments: [
        {
            email: {type: String},
            message: {type: String},
            createdAt: {type: Number}
        }
    ]
});

module.exports = mongoose.model("Posts", schema);