const express = require('express');
const router = express.Router();
const { trackVisit, getWeeklyTraffic } = require('../controllers/analyticsController');

router.post('/track', trackVisit);
router.get('/weekly', getWeeklyTraffic);

module.exports = router;
