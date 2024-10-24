
const express = require('express');
const {country,realdata} = require('../controllers/countrycontroller')
const router = express.Router();
const {isauth} = require('../middleware/isauth')


router.get('/country',isauth, country);

router.get('/realdata',isauth,realdata)

module.exports = router;