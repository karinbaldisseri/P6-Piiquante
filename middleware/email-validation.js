const validator = require('validator');

module.exports = (req, res, next) => {
    const email = req.body.email;

    if (validator.isEmail) {
        next();
    } else {
        return res.status(400).json({ error: "l'email n'est pas valide !" })
    }
};