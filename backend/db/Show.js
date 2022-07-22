const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    title: String,
    streamingApp: String,
    rating: String,
    review: String
});

module.exports = mongoose.model("shows", showSchema);