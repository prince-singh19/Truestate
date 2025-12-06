
const express = require('express');
const { getSalesRecords } = require('../controllers/salesController');

const router = express.Router();

router.get('/', getSalesRecords);

module.exports = router;