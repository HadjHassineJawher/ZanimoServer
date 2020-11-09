const express = require('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();

var { Users } = require('../Models/Users');

//retriving all data from database
router.get('/', (req, res) => {
    Users.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    });
})

// retriving a data from database with a given id
router.get('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No record with Given Id: ${req.params.id}`);
    }

    Users.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// Deleting a data from database with a given id
router.delete('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No record with Given Id: ${req.params.id}`);
    }

    Users.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Removing Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})
// posting data in the database
router.post('/', (req, res) => {

    var user = new Users({
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        numtel: req.body.numtel,
        motdepasse: req.body.motdepasse,
    })

    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Saving Data in Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})


// updating a user 
router.patch('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No record with Given Id: ${req.params.id}`);
    }

    var user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        numtel: req.body.numtel,
        motdepasse: req.body.motdepasse,
    };

    Users.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Updating Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;