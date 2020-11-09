const mongoose = require('mongoose');

var Users = mongoose.model('Users', {

    nom: { type: String },
    prenom: { type: String },
    mail: { type: String },
    numtel: { type: String },
    motdepasse: { type: String }
})

module.exports = { Users };