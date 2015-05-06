var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');

var router = express.Router();

router.post('/', function(req, res) {
    var port = serialportService.getSerialPort();
    
    var toggle = "off";
    if(req.body.toggleOn) {
        toggle = "on";
    }
    
    port.write(toggle+"\n", function(err, results) {
        if(err) {
           console.log('err ' + err); 
        }
        console.log('results ' + results);
    });
    res.send('Turning LED ' + toggle + ' ...'+ drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;