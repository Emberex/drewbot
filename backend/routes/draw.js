var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');
var serialportService = require('./../services/serialportService');

var router = express.Router();

router.post('/', function(req, res) {
    var port = serialportService.getSerialPort();
    
    port.write("on\n", function(err, results) {
        if(err) {
           console.log('err ' + err); 
        }
        console.log('results ' + results);
    });
    
    res.send('Drawing line... ' + drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;