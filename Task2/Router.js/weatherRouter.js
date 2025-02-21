const express = require('express');
const router = express.Router();
const weatherController = require('../Controller/weathercontroller');

router.post('/', weatherController.saveWeatherData);
router.get('/', weatherController.getWeatherData);

module.exports = router;