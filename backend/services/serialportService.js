var serialPort = require('serialport');

var port;

serialPort.list(function(err, ports) {
    console.log("Opening serial port: ", ports.slice(-1)[0].comName);
    port = new serialPort.SerialPort(ports.slice(-1)[0].comName, null, false);
    port.open(function(err) { 
        if(err) {
            console.log("on open err: ", err);
        } else {
            console.log("serial port opened successfully!");
        }
    });
});


module.exports = {
	getSerialPort: function() {
		return port;
	}	
};