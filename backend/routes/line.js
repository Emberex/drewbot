var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var router = express.Router();

router.post('/', function(req, res) {
    res.send('Drawing line... ' + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;