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
    const Vresolucion = 0.0196078;
    const valorComBin = parseInt(data.toString('hex'),16);
    console.log(valorComBin);
    const Va = (valorComBin)*(Vresolucion)+0;
    console.log(Va);
    const E1_E2 = (Va) / (1.666666);
    console.log(E1_E2);
    const E2 = 3 - E1_E2;
    console.log(E2);
    const DeltaR = ((10000)*(6-(2*E2)))/(6-E2);
    console.log(DeltaR);
    const Rsen = 10000 - DeltaR;
    console.log(Rsen);
    const distancia = (Rsen - 10000)/(-200);
    console.log(distancia);
    //console.log(data.toString);
    if(valorComBin !== enterog){
    io.emit('microcontrolador:data',{
        value: distancia.toString()
    });
    }
    enterog = valorComBin;
});

//Ocurre un error

mySerial.on("err", function(err){
    console.log(err.message);
});

server.listen(3000, () => {
    console.log("Server on port",3000);
});