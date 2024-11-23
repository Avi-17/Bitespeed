const express = require('express');
const identifyContact = require('../controllers/myController');

const router = express.Router();
router.post('/identify', identifyContact)

module.exports = router;