const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String},
    description: {type: String},
    items: [{
        name: {type: String},
        price: {type: String},
        sold: {type: Boolean}
    }],
    zip: {type: Number},
    createdAt: {type: Number}
});

module.exports = mongoose.model("Posts", schema);