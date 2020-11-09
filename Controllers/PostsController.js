const express = require('express');
const { isValidObjectId } = require('mongoose');
var router = express.Router();

var { Posts } = require('../Models/Posts');

// retriving all data from Posts
router.get('/', (req, res) => {
    Posts.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Data from Posts :' + JSON.stringify(err, undefined, 2));
        }
    });
})


// retriving a data from database with a given id
router.get('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No record with Given Id: ${req.params.id}`);
    }

    Posts.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Retriving Data from Posts :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// Deleting a data from database with a given id
router.delete('/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No record with Given Id: ${req.params.id}`);
    }

    Posts.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Removing Data from Posts :' + JSON.stringify(err, undefined, 2));
        }
    })
})

//posting data in Database
router.post('/', (req, res) => {

    var Post = new Posts({
        image: req.body.image,
        date: req.body.date,
        DateExpiration: req.body.DateExpiration,
        Description: req.body.Description,
        GenreAnimale: req.body.GenreAnimale,
        TypeAnimale: req.body.TypeAnimale,
        TypeAnnonce: req.body.TypeAnnonce,
    })

    Post.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Saving Data in Posts :' + JSON.stringify(err, undefined, 2));
        }
    })
})

module.exports = router;