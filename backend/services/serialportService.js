var serialPort = require('serialport');

var port;

serialPort.list(function(err, ports) {
    if(ports) {
        console.log("Opening serial port: ", ports.slice(-1)[0].comName);
        port = new serialPort.SerialPort(ports.slice(-1)[0].comName, null, false);
        port.open(function(err) { 
            if(err) {
                console.log("on open err: ", err);
            } else {
                console.log("serial port opened successfully!");
            }
        });
    } else {
        console.log("No devices found on serial ports.");
    }
});

function getSerialPort() {
    return port;
}

function writeCommand(command) {        
    port.write(command, function(err, results) {
        if(err) {
           console.log('err ' + err); 
        }
        console.log('results ' + results);
    });
}

function writeCharacter(commands) {
    console.log(commands);
    /* jshint ignore:start */
    for (i = 0; i < commands.length; i++) {
        (function(i){ 
            setTimeout(function(){
                var command = commands[i] + "\n";
                console.log(command);
                writeCommand(command);
            }, 50 * i);
        }(i));
    }
    /* jshint ignore:end */
}

module.exports = {
	getSerialPort: getSerialPort,
    writeCommand: writeCommand,
    writeCharacter: writeCharacter
};