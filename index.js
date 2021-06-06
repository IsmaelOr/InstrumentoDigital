const express = require('express');
const socketIo = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function(scoket){
    console.log("a new socket connected");
});

app.get('/', (req,res,next) =>{
    res.sendFile(__dirname + '/index.html');
} );


const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();

const mySerial = new SerialPort("COM6",{baudRate:9600});

// Abres conexión serial

mySerial.on('open', function(){
    console.log("Puerto Serial Abierto");
});

//Imprimes los datos

mySerial.on("data", function(data){
    /* 
    const valorrecibido = data.toString();
    // 10101101
    valorrecibido = logica de Vresolucion 
    */
    console.log(data.toString());
    io.emit('microcontrolador:data',{
        value: data.toString()
    });
});

//Ocurre un error

mySerial.on("err", function(err){
    console.log(err.message);
});

server.listen(3000, () => {
    console.log("Server on port",3000);
});