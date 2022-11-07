const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const PlayersSchema = new Schema({
    name: String,
    sport: String,
    rank: Number
});

module.exports = mongoose.model('Players', PlayersSchema);