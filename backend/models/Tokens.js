const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {type: String},
    token: {type: String}
});

module.exports = mongoose.model("Tokens", schema);