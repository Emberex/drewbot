var express = require('express');
var drewbotUtils = require('./../services/drewbotUtils');

var serialPort = require('serialport');
var port;
serialPort.list(function(err, ports) {
    console.log("Opening serial port: ", ports.slice(-1)[0].comName);
    port = new serialPort.SerialPort(ports.slice(-1)[0].comName, null, false);
    port.open(function(err) { 
        console.log("on open err: ", err);
    });
});


var router = express.Router();

router.post('/', function(req, res) {
    
    port.on('data', function(data) {
        console.log('data received: ' + data);
    });
    
    var toggle = "off";
    if(req.body.toggleOn) {
        toggle = "on";
    }
    
    port.write(toggle+"\n", function(err, results) {
        console.log('err ' + err);
        console.log('results ' + results);
    });
    res.send('Turning LED ' + toggle + ' ...'+ drewbotUtils.getCurrentFormattedTime());
});

module.exports = router;