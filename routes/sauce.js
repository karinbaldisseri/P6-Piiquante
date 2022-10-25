const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const sauceControl = require('../controllers/sauce');
const likeControl = require('../controllers/like');


// ROUTES
router.post('/', auth, multer, sauceControl.createSauce);
router.put('/:id', auth, multer, sauceControl.modifySauce);
router.delete('/:id', auth, sauceControl.deleteSauce);
router.get('/:id', auth, sauceControl.getOneSauce);
router.get('/', auth, sauceControl.getAllSauces);
router.post('/:id/like', auth, likeControl.likeSauce);


//EXPORTS
module.exports = router;