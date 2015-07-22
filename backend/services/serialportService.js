var serialPort = require('serialport');

var port;

connect();

function connect() {
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
}

function writeCommand(command) {
    port.write(command, function(err, results) {
        if(err) {
           console.log('err ' + err);
        }
        console.log('results ' + results);
    });
}

function writeCommands(commands) {
    console.log(commands);
    /* jshint ignore:start */

    var lastR;
    var lastL;
    var lastI;
    var timeoutCounter = 0;

    for (var i = 0; i < commands.length;) {

        if(commands[i].indexOf("i") === -1) {
            var doL = commands[i].indexOf("l") === 0 && commands[i] !== lastL;
            console.log("L: ",commands[i], " ", lastL," ", commands[i].indexOf("l"));
            if(doL) {
                lastL = commands[i];
            }
            var doR = commands[i+1].indexOf("r") === 0 && commands[i+1] !== lastR;
            console.log("R: ",commands[i+1], " ", lastR," ", commands[i+1].indexOf("r"));
            if(doR) {
                lastR = commands[i+1];
            }
            if(doL || doR) {
                (function(i, timeoutCounter){
                    setTimeout(function(){
                        if(doL) {
                            var command1 = commands[i] + "\n";
                            writeCommand(command1);
                            console.log(command1);
                        }
                        if(doR) {
                            var command2 = commands[i+1] + "\n";
                            writeCommand(command2);
                            console.log(command2);
                        }
                    }, 300 * timeoutCounter);
                }(i, timeoutCounter));
                timeoutCounter++;
            }
            i = i+2;
        } else {
            console.log("I: ", commands[i], " ", lastI," ", commands[i].indexOf("i"));
            if(commands[i].indexOf("i") === 0 && commands[i] !== lastI) {
                (function(i, timeoutCounter){
                    setTimeout(function(){
                        var commandI = commands[i] + "\n";
                        console.log(commandI);
                        writeCommand(commandI);
                    }, 300 * timeoutCounter);
                }(i, timeoutCounter));
                timeoutCounter++;
                lastI = commands[i];
            }
            i = i+1;
        }
    }
    /* jshint ignore:end */
}

module.exports = {
    writeCommand: writeCommand,
    writeCommands: writeCommands,
    connect: connect
};