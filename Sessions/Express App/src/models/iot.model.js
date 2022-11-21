const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const IotSchema = new Schema({
    temperature: Number,
    batteryLevel: Number,
    timeStamp: Date
    // timeStamp: { type: Date, default: () => new Date() }
});

module.exports = mongoose.model('Iot', IotSchema, "iot");