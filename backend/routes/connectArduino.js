var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');

var router = express.Router();

router.post('/', function(req, res) {
    
    serialportService.connect();
    
    res.send('Connecting arduino... ' + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;