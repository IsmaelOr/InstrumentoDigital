const SerialPort = require("serialport");

const port = new SerialPort("COM5");

const person = {
    name:"Bob",
    age:23
}

port.write("2000");