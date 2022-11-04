const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const UsersSchema = new Schema({
    name: String,
    age: Number,
    address: String
});

module.exports = mongoose.model('Users', UsersSchema);