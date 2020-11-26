const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./Database.js');
var UserController = require('./Controllers/UserController.js');
var AdminController = require('./Controllers/AdminController.js');

var app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.use('/Users', UserController);
app.use('/Admins', AdminController);

app.listen(3030, () => {
    console.log('Server started at Port: 3030');
})