var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');
var strokeService = require('./../services/strokeService');

var router = express.Router();

router.post('/', function(req, res) {
    
    var commands = strokeService.getCommands(req.body.strokes);
    serialportService.writeCommands(commands);
    
    res.send('Drawing Strokes... ' + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;