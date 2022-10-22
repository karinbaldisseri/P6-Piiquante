const Sauce = require('../models/Sauce');
const fs = require('fs');


// CREATE - Créer une nouvelle sauce -> POST
exports.createSauce = (req, res, next) => {
    const sauceData = JSON.parse(req.body.sauce);
    if (req.body.sauce != null) { // if (req.body sauce) 
        if (sauceData.userId != req.auth.userId) {
            res.status(403).json({ error: 'Unauthorized request' });
        } else {
            const sauce = new Sauce({
            // opérateur spread qui récupère les données de la requête
            ...sauceData,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            });
            sauce.save()
                .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
                .catch(error => { res.status(400).json({ error }) });
        }
    } else {
        return res.status(400).json({ message : 'Bad request !'})
    }
};


// UPDATE - Modifier une sauce -> PUT
exports.modifySauce = (req, res, next) => {
    const sauceData = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ error: 'Unauthorized request' });
            } else {
                // Récupérer le nom du fichier image
                const filename = sauce.imageUrl.split('/images/')[1];
                // Supprimer l'image du dossier images
                fs.unlink(`images/${filename}`, () => {
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceData, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => { res.status(400).json({ error }) });
};

// DELETE - Supprimer une sauce -> DELETE
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ error: 'Unauthorized request' });
            } else {
                // Récupérer le nom du fichier image
                const filename = sauce.imageUrl.split('/images/')[1]; 
                // Supprimer l'image du dossier images
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() =>  res.status(200).json({ message: 'Sauce supprimée !' }))
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => res.status(404).json({ error }));
};

// READ - Lire/Récupérer une sauce -> GET
exports.getOneSauce = (req, res, next) => {
    const id = req.params.id;
    // pour récupérer une seule sauce bien spécifique
    Sauce.findById(id)
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// READ - Lire/Récupérer toutes les sauces -> GET
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};