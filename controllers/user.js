const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();

const User = require('../models/User');

exports.signup = (req, res, next) => {
    // vérifier que les données de req existent
    if (req.body.email !== null && req.body.password !== null) {
        // hashage du mail (crypto-js)
        const cryptoJsEmail = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`).toString();
        // hashage du mot de passe + salage (bcrypt) 
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                // création de user et sauvegarde dans DB
                const user = new User({
                    email: cryptoJsEmail,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message : 'Utilisateur enregistré !'}))
                    .catch(() => res.status(500).json({ error: 'internal server error' }));
            })
            .catch(() => res.status(500).json({ error: 'internal server error'}));
    } else {
        res.status(400).json({ error: 'client input error' });
    }
};

exports.login = (req, res, next) => {
    // vérifier que les données de req existent
    if (req.body.email !== null && req.body.password !== null) {
    // hashage du mail pour recherche dans DB (crypto-js)
        const cryptoJsEmail = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`).toString();
    // vérifie si l'email transmis se trouve dans DB/ si le user est enregistré
    User.findOne({ email: cryptoJsEmail })
        .then((user => {
            // vérifie si le user existe dans DB ou pas
            if (!user) {
                res.status(404).json({ message: 'Identifiant et/ou mot de passe incorrect 1 !' });
            } else {
                // vérifie si le mot de passe transmis est valide / correct / correspond au MdP haché de DB
                bcrypt.compare(req.body.password, user.password) // user.password decrypt crypto-js
                    .then(validPassword => {
                        if (!validPassword) {
                            res.status(404).json({ message: 'Identifiant et/ou mot de passe incorrect 2 !' })
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    `${process.env.JWT_TOKEN}`,
                                    { expiresIn: '1h' } 
                                )
                            });
                        }
                    })
                    .catch(() => res.status(500).json({ error: 'internal server error' }));
            }
        }))
        .catch(()=> res.status(500).json({ error: 'internal server error' }));
    } else {
        res.status(400).json({ error: 'client input error' });
    }
};