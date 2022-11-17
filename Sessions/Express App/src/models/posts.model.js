const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PostsSchema = new Schema({
    author: String,
    designation: String,
    article: String
});

module.exports = mongoose.model('Posts', PostsSchema);