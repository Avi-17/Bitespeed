const express = require('express');
const getData = require('../controllers/getData');

const router = express.Router();
router.post('/getAll', getData);

module.exports = router;