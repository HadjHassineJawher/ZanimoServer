const mongoose = require('mongoose');

var Posts = mongoose.model('Posts', {

    image: { type: String },
    date: { type: String },
    DateExpiration: { type: String },
    Description: { type: String },
    GenreAnimale: { type: String },
    TypeAnimale: { type: String },
    TypeAnnonce: { type: String }
})

module.exports = { Posts };