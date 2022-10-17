const PasswordValidator = require('password-validator');
const passwordValidator = require('password-validator');

// Création du schéma
const passwordSchema = new PasswordValidator();

// Schéma que doit respecter le mot de passe saisi au signup
passwordSchema
    .is().min(6, "Minimum 6 caractères svp ! " )    // Minimum length 6
    .is().max(50, "Le mot de passe est trop long")  // Maximum length 50
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values


// Vérifier que le mot de passe respecte le schéma
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        res.status(400).json({ error: `Veuillez renforcer votre mot de passe : ${passwordSchema.validate(req.body.password, { list: true })}` });
    }
};
