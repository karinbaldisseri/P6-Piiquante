const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
require('dotenv').config();
const User = require('../models/User');

// SIGNUP 
exports.signup = (req, res) => {
    // Verify : data exists
    if (req.body.email !== null && req.body.password !== null) {
        // Email encryption
        const cryptoJsEmail = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`).toString();
        // Password hash + salt 
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                // Create user and save in DB
                const user = new User({
                    email: cryptoJsEmail,
                    password: hash
                });
                user.save()
                    .then(() => res.status(201).json({ message : 'User created !'}))
                    .catch(() => res.status(500).json({ error: 'Internal server error' }));
            })
            .catch(() => res.status(500).json({ error: 'Internal server error'}));
    } else {
        res.status(400).json({ error: 'Client input error' });
    }
};


// LOGIN
exports.login = (req, res) => {
    if (req.body.email !== null && req.body.password !== null) {
        const cryptoJsEmail = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL_KEY}`).toString();
        User.findOne({ email: cryptoJsEmail })
            .then((user => {
                // Check if user exists in DB
                if (!user) {
                    res.status(404).json({ message: 'Invalid user and/or password !' });
                 } else {
                    // Check if password is valid
                     bcrypt.compare(req.body.password, user.password) 
                        .then(validPassword => {
                            if (!validPassword) {
                                res.status(404).json({ message: 'Invalid user and/or password !' })
                            } else {
                                res.status(200).json({
                                    // Create token
                                    userId: user._id,
                                    token: jwt.sign(
                                        { userId: user._id },
                                        `${process.env.JWT_TOKEN}`,
                                        { expiresIn: '1h' } 
                                    )
                                });
                            }
                        })
                    .catch(() => res.status(500).json({ error: 'Internal server error' }));
                }
            }))
            .catch(()=> res.status(500).json({ error: 'Internal server error' }));
    } else {
        res.status(400).json({ error: 'Client input error' });
    }
};