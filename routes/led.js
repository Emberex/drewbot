var express = require('express');
var drewbotUtils = require('./../backend/src/drewbotUtils');
var router = express.Router();

router.post('/', function(req, res) {
    
    var toggle = "off";
    if(req.body.toggleOn) {
        toggle = "on";
    }
    res.send('Turning LED ' + toggle + ' ...'+ drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;