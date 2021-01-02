const mongoose = require('mongoose');

/*  ---------------------- Data Base URL and Information  ---------------------- */
mongoose.connect('mongodb+srv://HadjHassineJawher:Jawher010698@zanimoapplication.pg291.mongodb.net/ZanimoDataBase?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, (err) => {
        if (!err)
            console.log(' Connection To DataBase Succeeded ');
        else
            console.log(' Error in DataBase Connection: ' + JSON.stringify(err, undefined, 2));
    });

module.exports = mongoose;