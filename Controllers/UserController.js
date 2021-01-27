const express = require('express');
const { isValidObjectId } = require('mongoose');
const jwt = require('jsonwebtoken');

var router = express.Router();

var { Users } = require('../Models/Users');
var { Admins } = require('../Models/Admin');

/*  ----------------------  URL Initialisation and Return All Users ---------------------- */

// Retriving All Users
router.get('/', (req, res) => {
    Users.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Error in Retriving Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    });
})


/*  ----------------------  User Operations  ---------------------- */

// Retriving One User from database with a given id
router.get('/OneUser/:id', (req, res) => {
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

// Adding New User in the database
router.post('/', (req, res) => {

    var user = new Users({
        nom: req.body.nom,
        prenom: req.body.prenom,
        imageuser: req.body.imageuser,
        mail: req.body.mail,
        numtel: req.body.numtel,
        motdepasse: req.body.motdepasse,
        status: req.body.status,
        posts: req.body.posts,
    })

    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Saving Data in Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// Deleting User  with a given id
router.delete('/OneUser/:id', (req, res) => {
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

// Updating User 
router.patch('/OneUser/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No record with Given Id: ${req.params.id}`);
    }

    var user = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        imageuser: req.body.imageuser,
        mail: req.body.mail,
        numtel: req.body.numtel,
        motdepasse: req.body.motdepasse,
        status: req.body.status
    }

    Users.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Updating Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    });
});

//Authentification User returning Json File 
router.post('/AuthUser', (req, res) => {
    userr = req.body;
    Users.findOne({ mail: userr.mail, motdepasse: userr.motdepasse }, (err, User) => {
        if (!err) {
            if (!User) {
                res.status(401).send('Invalid E-mail');
            } else if (User.motdepasse !== userr.motdepasse) {
                res.status(401).send('Invalid password');
            } else {
                /* var mail = User.mail;
                 var motdepasse = User.motdepasse;*/
                res.status(200).send(User);
            }
        } else {
            console.log('Error in Retriving Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})

/*  ----------------------  Post Operations  ---------------------- */

// lOST Animals API
router.get('/LostPosts',(req,res)=>{
    Users.find({'posts.typeAnnonce':'Perdu'},(err,doc)=>{
        if(!err){
                res.send(doc);
        }else {
            console.log('Error in Retriving Data :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// Found Animals API
router.get('/FoundPosts',(req,res)=>{
    Users.find({'posts.typeAnnonce':'Trouver'},(err,doc)=>{
        if(!err){
                res.send(doc);
        }else {
            console.log('Error in Retriving Data :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// Adopt Animals API
router.get('/AdoptPosts',(req,res)=>{
    Users.find({'posts.typeAnnonce':'Adopter'},(err,doc)=>{
        if(!err){
                res.send(doc);
        }else {
            console.log('Error in Retriving Data :' + JSON.stringify(err, undefined, 2));
        }
    })
})


// Searching Specific Post with User Id and Post Id
router.get('/OnePost/:id/:idd', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else if (!isValidObjectId(req.params.idd)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idd} `);
    } else {
        Users.findById({ _id: req.params.id, posts: req.params.idd }, { "posts.comments": 0 }, (err, doc) => {
            if (!err) {
                for (var i = 0; i < doc.posts.length; i++) {
                    if (doc.posts[i]._id == req.params.idd) {
                        var tab = [];
                        arr = doc.posts[i];
                        tab.push(arr);
                        console.log(tab)
                        res.send(tab);
                        //console.log(" I'm so glad Serving you Bruh ")
                    } else {
                        console.log(" Oops i Found Nothing Bruh ")
                    }
                }
            } else {
                console.log('Error in Retriving Post Data from Users bruh :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

// Posting new Posts in Specific User
router.post('/AddPost/:id', (req, res) => {

    var post = {
        image: req.body.image,
        date: req.body.date,
        description: req.body.description,
        dateExpiration: req.body.dateExpiration,
        genreAnimale: req.body.genreAnimale,
        typeAnimale: req.body.typeAnimale,
        typeAnnonce: req.body.typeAnnonce,
    }

    Users.findByIdAndUpdate({ _id: req.params.id }, { $addToSet: { "posts": post } }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in Saving new Data in Posts :' + JSON.stringify(err, undefined, 2));
        }
    });
})

// Deleting Specific Post with User Id and Post Id
router.patch('/DeletePost/:id/:idd', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else if (!isValidObjectId(req.params.idd)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idd} `);
    } else {
        Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idd }, { new: true }, (err, doc) => {
            if (!err) {
                for (var i = 0; i < doc.posts.length; i++) {
                    if (doc.posts[i]._id == req.params.idd) {
                        doc.posts[i].remove();
                        doc.save()
                        console.log(`Post : ${req.params.idd} was Deleted Successfully`);
                        res.send(doc);
                        //console.log(" I'm so glad Serving you Bruh ")
                    } else {
                        console.log(" Oops i Found Nothing ")
                    }
                }
            } else {
                console.log('Error in Deleting Post :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

// Updating a Specific Post with Id 
router.patch('/UpdatePost/:id/:idP', (req, res) => {

    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else if (!isValidObjectId(req.params.idp)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idP} `);
    } else {
        Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idP }, { new: true }, (err, doc) => {
            if (!err) {
                for (var i = 0; i < doc.posts.length; i++) {
                    if (doc.posts[i]._id == req.params.idP) {
                        doc.posts[i].image = req.body.image;
                        doc.posts[i].date = req.body.date;
                        doc.posts[i].description = req.body.description;
                        doc.posts[i].dateExpiration = req.body.dateExpiration;
                        doc.posts[i].genreAnimale = req.body.genreAnimale;
                        doc.posts[i].typeAnimale = req.body.typeAnimale;
                        doc.posts[i].typeAnnonce = req.body.typeAnnonce;
                        doc.save();
                        //console.log( doc.posts[i].comments[j])
                        res.send(`Post: ${req.params.idP} was Updated Successfully` + doc.posts[i]);
                    }
                }
            } else {
                console.log('Error in Upadating Post :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

/*  ----------------------  Comment Operations  ---------------------- */

// Searching Specific Comment with User Id , Post Id and Comment Id
router.get('/OneComment/:id/:idp/:idc', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else if (!isValidObjectId(req.params.idp)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idp} `);
    } else if (!isValidObjectId(req.params.idc)) {
        return res.status(400).send(`No Comment  with this Given Id: ${req.params.idc} `);
    } else {
        Users.findById({ _id: req.params.id, posts: req.params.idp, "posts.comments": req.params.idc }, (err, doc) => {
            if (!err) {
                for (var i = 0; i < doc.posts.length; i++) {
                    for (var j = 0; j < doc.posts[i].comments.length; j++) {
                        if (doc.posts[i].comments[j]._id == req.params.idc) {
                            res.send(doc.posts[i].comments[j]);
                            //console.log(" I'm so glad Serving you Bruh ")
                        } else {
                            console.log(" Oops i Found Nothing Bruh ")
                        }
                    }
                }
            } else {
                console.log('Error in Retriving Post Data from Users bruh :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

// Posting New Comments in Specific User, and Spesific Post either
router.patch('/AddComment/:id/:idp', (req, res) => {

    var comm = {
        comment: req.body.comment
    }

    Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idp }, { new: true }, (err, doc) => {
        if (!err) {
            for (var i = 0; i < doc.posts.length; i++) {
                if (doc.posts[i]._id == req.params.idp) {
                    doc.posts[i].comments.push(comm);
                    doc.save();
                    res.send(doc.posts[i]);
                    console.log(doc.posts[i].comments);
                } else {
                    console.log(" Oops i Found Nothing Bruh ")
                }
            }
        } else {
            console.log('Error in Saving new comment :' + JSON.stringify(err, undefined, 2));
        }
    })
})

// Delete Comment found by User Id , Post Id 
router.patch('/DeleteComment/:id/:idp/:idc', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else if (!isValidObjectId(req.params.idd)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idd} `);
    } else if (!isValidObjectId(req.params.idc)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idc} `);
    }
    else {
        Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idp, "posts.comments": req.params.idc }, { new: true }, (err, doc) => {
            if (!err) {
                for (var i = 0; i < doc.posts.length; i++) {
                    for (var j = 0; j < doc.posts[i].comments.length; j++) {
                        if (doc.posts[i].comments[j]._id == req.params.idc) {
                            doc.posts[i].comments[j].remove();
                            doc.save();
                            console.log(`Comment : ${req.params.idc} was Deleted Successfully`)
                            res.send(doc);
                        } else {
                            console.log(" Oops i Found Nothing Bruh ")
                        }
                    }
                }
            } else {
                console.log('Error in Deleting  comment :' + JSON.stringify(err, undefined, 2));
            }
        })
    }

})

// Updating a data from database with a given id of commnet 
router.patch('/UpdateComment/:id/:idP/:idC', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else if (!isValidObjectId(req.params.idp)) {
        return res.status(400).send(`No Post  with this Given Id: ${req.params.idP} `);
    } else if (!isValidObjectId(req.params.idc)) {
        return res.status(400).send(`No Comment  with this Given Id: ${req.params.idc} `);
    } else {
        Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idP }, { new: true }, (err, doc) => {
            if (!err) {
                for (var i = 0; i < doc.posts.length; i++) {
                    for (var j = 0; j < doc.posts[i].comments.length; j++) {
                        if (doc.posts[i].comments[j]._id == req.params.idC) {
                            doc.posts[i].comments[j].comment = req.body.comment;
                            doc.save();
                            console.log(`Comment : ${req.params.idC} was Updated Successfully`)
                            res.send(doc.posts[i].comments[j]);
                        }

                    }

                }
            } else {
                console.log('Error in Upadating Data from comments :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

/*  ----------------------  Ban Operations  ---------------------- */

// Ban a Specific User with Id 
router.patch('/Ban/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else {
        Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idP }, { $set: { 'status': false } }, { new: true }, (err, doc) => {
            if (!err) {
                console.log(`User: ${req.params.id} was Banned `)
                res.send(doc);
            } else {
                console.log('Error in Banning User :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

// UnBan a Specific User with Id 
router.patch('/UnBan/:id', (req, res) => {
    if (!isValidObjectId(req.params.id)) {
        return res.status(400).send(`No User with this Given Id: ${req.params.id} `);
    } else {
        Users.findByIdAndUpdate({ _id: req.params.id, posts: req.params.idP }, { $set: { 'status': true } }, { new: true }, (err, doc) => {
            if (!err) {
                console.log(`User: ${req.params.id} was UnBanned `)
                res.send(doc);
            } else {
                console.log('Error in UnBaning User :' + JSON.stringify(err, undefined, 2));
            }
        })
    }
})

/*  ----------------------  Filter Operations  ---------------------- */

// Filtering Users by Name
router.get('/FilterUsers', (req, res) => {
    const SearchField = req.query.nom;
    Users.find({ nom: { $regex: SearchField, $options: 'i' } }, { "posts": 0 })
        .then(doc => {
            res.send(doc)
        })
})

/*  ---------------------- Admin Authentification and Authorization ---------------------- */

//Admin login Authentification
router.post('/Admin/Authentification', (req, res) => {
    let AdminData = req.body;
    Admins.findOne({ mail: AdminData.mail }, (err, Admin) => {
        if (err) {
            console.log(err);
        } else
            if (!Admin) {
                res.status(401).send('Invalid E-mail');
            }
            else
                if (Admin.motdepasse !== AdminData.motdepasse) {
                    res.status(401).send('Invalid Password');
                }
                else {
                    let payload = { subject: Admin._id }
                    let token = jwt.sign(payload, 'SecretKey', { expiresIn: '24h' })
                    //console.log({ payload })
                    res.status(200).send({ token })
                }
    })
})

// Verifiy that the Token send is a true Token, not a Fake one and giving Data access 
function VerifiyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send("Unauthorized request")
    }

    let token = req.headers.authorization.split(' ')[1];

    if (token === 'null') {
        return res.status(401).send("Unauthorized request")
    }

    let payload = jwt.verify(token, 'SecretKey');

    if (!payload) {
        return res.status(401).send("Unauthorized request")
    }
    req.AdminId = payload.subject;
    next();
}

/*  /////////////////////////////// API In Progress  ///////////////////////////////  */

/*  ---------------  Filter Operations  ---------------- */

// Filtering Users by Name
router.get('/FilterUsers', (req, res) => {
    const SearchField = req.query.nom;
    Users.find({ nom: { $regex: SearchField, $options: 'i' } }, { "posts": 0 })
        .then(doc => {
            res.send(doc)
        })
})

// Filtering Posts by Animal's Type --> Returnig the WHOLE doc !?
router.get('/FilterPosts', (req, res) => {
    const SearchField = req.query.typeAnimale;
    Users.find({ 'posts.typeAnimale': { $regex: SearchField, $options: 'i' } }, { "posts.comments": 0 })
        .then(doc => {
            res.send(doc);
        })
})
/*
router.get('/OnlyPosts', (req, res) => {
    Users.find((err, doc) => {
        if (!err) {
            for (var i = 0; i < doc.length; i++) {
                //console.log(doc[i].posts);
                var a = doc[i].posts;
                let arr = [];
                arr.push(a)
                res.send.json({ arr });
                //res.send(doc[i].posts)
            }

        } else {
            console.log('Error in Removing Data from Users :' + JSON.stringify(err, undefined, 2));
        }
    })
})

//Get only specific posts 
router.get('/onlypostsapi', (req, res) => {
    Users.find({}, (err, doc) => {
        if (!err) {
            for (var i = 0; i < doc.length; i++) {
                console.log(doc[i].posts)
                //res.send(doc[i].posts)
            }
        } else {
            console.log('Error in Retriving Post:' + JSON.stringify(err, undefined, 2));
        }
    })
})
*/


module.exports = router;