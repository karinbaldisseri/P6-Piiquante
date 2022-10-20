const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();

const sauceControl = require('../controllers/sauce');
const likeControl = require('../controllers/like');

/*  OU
const { createSauce, modifySauce, deleteSauce, getOneSauce, getAllSauces } = require('../controllers/sauce');
router.post('/', auth, multer, createSauce);
router.put('/:id', auth, multer, modifySauce);
router.delete('/:id', auth, deleteSauce);
router.get('/:id', auth, getOneSauce);
router.get('/', auth, getAllSauces); */

router.post('/', auth, multer, sauceControl.createSauce);
router.put('/:id', auth, multer, sauceControl.modifySauce);
router.delete('/:id', auth, sauceControl.deleteSauce);
router.get('/:id', auth, sauceControl.getOneSauce);
router.get('/', auth, sauceControl.getAllSauces);
router.post('/:id/like', auth, likeControl.likeSauce);

module.exports = router;