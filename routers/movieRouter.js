// richieamo Libreria
const express = require('express');
// router
const router = express.Router();

//index
router.get('/', movieController.index);

//show
router.get('/:id', movieController.show);
