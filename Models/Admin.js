const mongoose = require('mongoose');

var Admins = mongoose.model('Admins', {

    nom: { type: String },
    prenom: { type: String },
    image: { type: String },
    mail: { type: String },
    numtel: { type: String },
    motdepasse: { type: String }
})

module.exports = { Admins };