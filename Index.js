const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./Database.js');
var UserController = require('./Controllers/UserController.js');
var AdminController = require('./Controllers/AdminController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

/*  ----------------------  User Collection  ---------------------- */
app.use('/Users', UserController);
/*  ----------------------  Admin Collection  ---------------------- */
app.use('/Admins', AdminController);

/*  ----------------------  Server  ---------------------- */
var ServerPort = 3030;
app.listen(ServerPort, () => {
    console.log(' Welcome to Zanimo BackEnd Server ');
    console.log(` Server Started at Port : ${ServerPort}`);
})
