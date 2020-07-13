const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');

const publicPath = path.join(__dirname, '../src');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var countOfUsers = 0;
var allAudioMessages = [];

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile('C:/Users/Виктория/Documents/EPAM_WEB_Practice_Victoria_Davydova-master/04_HTML_with_server/client/index.html');
  //res.sendFile(path.join(__dirname, '../client/index.html'));
});

/*app.get('/', (req, res) => {
  res.sendFile('C:/Users/Виктория/Documents/WEB Summer Practice/dist/app.css');
  //res.sendFile(path.join(__dirname, '../index.html'));
});*/

app.get('/', (req, res)=>{
  res.sendFile('C:/Users/Виктория/Documents/EPAM_WEB_Practice_Victoria_Davydova-master/04_HTML_with_server/client/index.js');
  //res.sendFile(path.join(__dirname, '../client/index.js'));
});

app.get("/voices", (req, res)=>{
  res.send(allAudioMessages);
});

io.on('connection', (socket) => {
  console.log('New user connected');
  countOfUsers++;
  //io.emit("user", countOfUsers);//////////////add element

  socket.on('audioMessage', function(message) {
    io.emit("audioMessage", message);
    allAudioMessages.push({timeStamp:Date(), audioBlob: message});
    
  });

  socket.on('getAudioMessages', ()=> {
    io.emit("getStream", allAudioMessages);//stream
  });

  socket.on('getAllMessages', ()=> {
    io.emit("allAudioMessages", allAudioMessages);//list
  });

  socket.on("startRecording", ()=>{
    io.emit("playAudio");
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
    countOfUsers--;
    //io.emit("user", countOfUsers);//////////////add element
  });

});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
/*var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile('C:/Users/Виктория/Documents/EPAM_WEB_Practice_Victoria_Davydova-master/04_HTML_with_server/client/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});*/