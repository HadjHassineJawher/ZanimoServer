const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*  ---------------------- Comment Schema  ---------------------- */

const CommentSchema = new Schema({
    comment: { type: String }
})

/*  ---------------------- Post Schema  ---------------------- */

const PostSchema = new Schema({
    image: { type: String, required: true },
    date: { type: String },
    description: { type: String, required: true },
    dateExpiration: { type: String },
    genreAnimale: { type: String },
    typeAnimale: { type: String },
    typeAnnonce: { type: String, required: true },
    comments: [CommentSchema]
})

/*  ---------------------- User Schema  ---------------------- */

const UserSchema = new Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    imageuser: { type: String },
    mail: { type: String, required: true, unique: true, dropDups: true },
    numtel: { type: String, unique: true, dropDups: true },
    motdepasse: { type: String, required: true },
    status: { type: Boolean },
    posts: [PostSchema]
})

const Users = mongoose.model('Users', UserSchema)
module.exports = { Users };