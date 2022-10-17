const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const passwordValidation = require('../middleware/password-validation');

router.post('/signup', passwordValidation, userController.signup);
router.post('/login', userController.login);


//exportation du module
module.exports = router;