const mongoose = require('mongoose');

const washedSchema = mongoose.Schema({
    type: {type: String, required: true},
    brand: {type: String, required: true},
    texture: {type: String, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Washed', washedSchema);