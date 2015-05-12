var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');

var router = express.Router();

router.post('/', function(req, res) {
    
    
    serialportService.writeCharacter(req.body.commands);
    
    res.send('Writing... ' + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;