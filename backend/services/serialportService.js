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
    for (var i = 0; i < commands.length; i = i+2) {
        (function(i){ 
            setTimeout(function(){
                var command1 = commands[i] + "\n";
                var command2 = commands[i+1] + "\n";
                console.log(command1);
                console.log(command2);
                writeCommand(command1);
                writeCommand(command2);
            }, 500 * i);
        }(i));
    }
    /* jshint ignore:end */
}

module.exports = {
	getSerialPort: getSerialPort,
    writeCommand: writeCommand,
    writeCharacter: writeCharacter
};