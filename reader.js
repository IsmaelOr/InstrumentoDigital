const SerialPort = require("serialport");



const port = new SerialPort("COM6",{baudRate:9600,databits:8,parity:'none'});

//port.on("data",(line) => console.log(JSON.parse(line.toString("utf8"))));
port.on("data", (data) => console.log(data.toString()));