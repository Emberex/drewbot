var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');

var router = express.Router();

router.post('/', function(req, res) {

    serialportService.writeCommand(req.body.command);
    res.send("Command " + req.body.command +" Sent." + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;