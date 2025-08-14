const mongoose = require('mongoose');

const schemaUser = new mongoose.Schema({
    nom: {type:String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role: {type: String, required: true, enum: ['user', 'leader', 'admin'], default: 'user'},
    password: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', schemaUser);