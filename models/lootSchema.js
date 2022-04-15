const mongoose = require('mongoose');
const lootSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    boxes: { type: Number, default: 0},
    rafflePoints: { type: Number, default: 0},
    fragments: { type: Number, default: 0}

})

const model = mongoose.model('LootModels', lootSchema);

module.exports = model;