const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./Database.js');
var UserController = require('./Controllers/UserController.js');
var PostsController = require('./Controllers/PostsController.js');

var app = express();
app.use(bodyParser.json());
app.use('/Users', UserController);
app.use('/Posts', PostsController);

app.listen(3000, () => {
    console.log('Server started at Port: 3000');
})