const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: { type: String }
})

const PostShema = new Schema({
    image: { type: String, required: true },
    date: { type: String },
    description: { type: String, required: true },
    dateExpiration: { type: String },
    genreAnimale: { type: String },
    typeAnimale: { type: String },
    typeAnnonce: { type: String, required: true },
    comments: [CommentSchema]
})

const UserShema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    imageuser: { type: String },
    mail: { type: String, required: true },
    numtel: { type: String },
    motdepasse: { type: String, required: true },
    status: { type: Boolean },
    posts: [PostShema]
})

const Users = mongoose.model('Users', UserShema)
module.exports = { Users };