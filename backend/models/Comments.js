const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String},
    comment: {type: String},
    createdAt: {type: Number}
});

module.exports = mongoose.model("Comments", schema);
