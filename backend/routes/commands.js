var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');

var router = express.Router();

router.post('/', function(req, res) {

    serialportService.writeCommands(req.body.commands);
    res.send("Commands " + req.body.command +" Sent." + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;