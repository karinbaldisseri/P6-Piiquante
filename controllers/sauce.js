const Sauce = require('../models/Sauce');
const fs = require('fs');


// CREATE - Créer une nouvelle sauce -> POST
exports.createSauce = (req, res, next) => {
    const sauceData = JSON.parse(req.body.sauce);
    //delete sauceData._id;
    delete sauceData._userId;
    const sauce = new Sauce({
        // opérateur spread qui récupère les données de la requête == ...req.body
        ...sauceData,
        // ou const {name, manufacturer, description, mainPepper, heat, userId } = sauceData;
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }) })
        .catch(error => { res.status(400).json({ error }) });
};


// UPDATE - Modifier une sauce -> PUT
exports.modifySauce = (req, res, next) => {
    const sauceData = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    //delete sauceData._userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(403).json({ message: 'Non-autorisé !' });
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
                res.status(403).json({ message: 'Non-autorisé' });
            } else {
                // Récupérer le nom du fichier image
                //pour récupérer le dernier élément on peux utiliser ".at(-1)" au lieu d'utiliser la position [1]
                const filename = sauce.imageUrl.split('/images/')[1]; 
                // Supprimer l'image du dossier images
                fs.unlink(`images/${filename}`, () => {
                    // Supprimer la sauce de la DB
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
        //Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// READ - Lire/Récupérer toutes les sauces -> GET
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(404).json({ error }));
};