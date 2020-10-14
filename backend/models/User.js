const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String},
    email: {type: String}
})

module.exports = mongoose.model("User", schema)