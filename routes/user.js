const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passwordValidation = require('../middleware/password-validation');
const emailValidation = require('../middleware/email-validation');

router.post('/signup', emailValidation ,passwordValidation, userController.signup);
router.post('/login', userController.login);


//exportation du module
module.exports = router;