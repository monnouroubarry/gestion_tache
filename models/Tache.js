const { required } = require('joi');
const mongoose = require('mongoose');

const schemaTache = new mongoose.Schema({
    titre: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true, enum: ['encours', 'terminée'], default: 'encours'},
    dateEcheance: {type: Date},
    createdBy: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Tache', schemaTache);