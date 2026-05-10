// richieamo Libreria
const express = require('express');
// router
const router = express.Router();

// impoto il controller
const movieController = require('./../controllers/movieController')

//index
router.get('/', movieController.index);

//show
router.get('/:id', movieController.show);

//store review
router.post('/:id/reviews', movieController.storeReview);

module.exports = router