const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    temp: { type: Number, required: true },
    humidity: { type: Number, required: true },
    weather_s: { type: String, required: true }
}, { collection: 'open_weather_ data' });

const Weathers = mongoose.model('Weather', weatherSchema);

module.exports = Weathers;