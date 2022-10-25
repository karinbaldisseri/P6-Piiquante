const Sauce = require('../models/Sauce');
const fs = require('fs');


// CREATE new sauce -> POST
exports.createSauce = (req, res) => {
    const sauceData = JSON.parse(req.body.sauce);
    if (req.body.sauce != null) { 
        // Check if token is valid
        if (sauceData.userId != req.auth.userId) {
            res.status(403).json({ error: 'Unauthorized request' });
        } else {
            const sauce = new Sauce({
            ...sauceData,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
            sauce.save()
                .then(() => res.status(201).json({ message: 'Sauce created !' }))
                .catch(error => res.status(500).json({ error : 'Internal server error' }));
        }
    } else {
        return res.status(400).json({ message : 'Bad request'})
    }
};


// UPDATE sauce -> PUT
exports.modifySauce = (req, res) => {
    // Check if image file in request
    const sauceData = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.findOne({ _id: req.params.id, userId: req.auth.userId})
        .then((sauce) => {
             // If sauce can't be found in DB
            if (!sauce) {
                res.status(403).json({ error: 'Unauthorized request !' });
            } else {
                // If image to update - delete old image file
                if (sauceData.imageUrl) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => { });
                }
                    Sauce.updateOne({ _id: req.params.id ,userId: req.auth.userId }, { ...sauceData })
                        .then(() => res.status(200).json({ message: 'Sauce updated !' }))
                        .catch(error => res.status(500).json({ error : 'Internal server error' }));
            }
        })
        .catch(error => { res.status(500).json({ error : 'Internal server error' })});
};

// DELETE sauce -> DELETE
exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id , userId: req.auth.userId})
        .then(sauce => {
            // If sauce can't be found in DB
            if (!sauce) {
                res.status(403).json({ error: 'Unauthorized request !' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1]; 
                // Delete image in directory
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id, userId: req.auth.userId })
                        .then(() =>  res.status(200).json({ message: 'Sauce deleted !' }))
                        .catch(error => res.status(500).json({ error : 'Internal server error' }));
                });
            }
        })
        .catch(error => res.status(500).json({ error : 'Internal server error' }));
};

// READ - Get single sauce -> GET
exports.getOneSauce = (req, res) => {
    const id = req.params.id;
    Sauce.findById(id)
        .then(sauce => {
            if (!sauce) {
               return res.status(404).json({ error : 'Resource not found'})
            }
            res.status(200).json(sauce)
        })
        .catch(error => res.status(500).json({ error : 'Internal server error'}));
};

// READ - Get all sauces -> GET
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(500).json({ error : 'Internal server error' }));
};