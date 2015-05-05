var express = require('express');
var drewbotUtils = require('./../backend/src/drewbotUtils');
var router = express.Router();

router.post('/', function(req, res) {
    res.send('Drawing line... ' + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;