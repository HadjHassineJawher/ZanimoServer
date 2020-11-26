const express = require('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();

var { Admins } = require('../Models/Admin');

//retriving all data from database
router.get('/', (req, res) => {
    Admins.find((err, docs) => {
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

    Admins.findById(req.params.id, (err, doc) => {
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

    Admins.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Removing Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// posting data in the database
router.post('/', (req, res) => {

    var admin = new Admins({
        nom: req.body.nom,
        prenom: req.body.prenom,
        image: req.body.image,
        mail: req.body.mail,
        numtel: req.body.numtel,
        image: req.body.image,
        motdepasse: req.body.motdepasse,
    })

    admin.save((err, doc) => {
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

    var Admin = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        numtel: req.body.numtel,
        image: req.body.image,
        motdepasse: req.body.motdepasse,
    };

    Admins.findByIdAndUpdate(req.params.id, { $set: Admin }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Updating Data from Admin :' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;