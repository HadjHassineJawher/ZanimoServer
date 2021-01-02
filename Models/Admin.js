const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  ---------------------- Admin Schema (Model)  ---------------------- */
const AdminSchema = new Schema({
    nom: { type: String },
    prenom: { type: String },
    image: { type: String },
    mail: { type: String, required: true },
    numtel: { type: String },
    motdepasse: { type: String, required: true }
})

const Admins = mongoose.model('Admins', AdminSchema)
module.exports = { Admins };