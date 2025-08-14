const mongoose = require('mongoose');

const shemaMember = new mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true}, 
    role: {type: String, enum: ['membre', 'leader'], default: 'membre'},
    leaderId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Membre', shemaMember); 



