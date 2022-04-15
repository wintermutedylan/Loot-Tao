const mongoose = require('mongoose'); 
const lbSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true},
    score: { type: Number}

})
const model = mongoose.model('HuTaoCarnivalBot', lbSchema);

module.exports = model;

