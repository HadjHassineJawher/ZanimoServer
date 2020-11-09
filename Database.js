const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jawher:jawher@cluster0.cvb5j.mongodb.net/Zanimo?retryWrites=true&w=majority', (err) => {
    if (!err)
        console.log('Connection Succeeded.');
    else
        console.log('Error in DataBase Connection:' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;