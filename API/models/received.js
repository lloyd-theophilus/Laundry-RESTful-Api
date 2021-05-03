const mongoose = require('mongoose');

const receivedSchema = mongoose.Schema({
    type: {type: String, required: true},
    brand: {type: String, required: true},
    texture: {type: String, required: true},
    date: { type: Date, default: Date.now },
    amount: {type: Number, required: true},
    branch: {type: String, required: true}

});

module.exports = mongoose.model('Received', receivedSchema);