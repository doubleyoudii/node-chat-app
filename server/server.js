const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + "/../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {generateMessage, generateLocationMessage} = require('./utils/message');

io.on('connection', (socket) => {
  console.log('User Connected');

  // socket.emit('newMessage', {
  //   from: "willyumburjer@gmail.com",
  //   text: "testing New Message function",
  //   createAt: new Date().getTime() 
  // })

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Connected'));

  socket.on('createMessage', (message, cback) => {
    console.log('New message receive ', message);

    //Sends newly Created Message to All client
    io.emit('newMessage', generateMessage(message.from, message.text));

    //Acknoledgements````````````````
    cback('this is from the server');


  });

  
  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User Disconnect')
  })

  // socket.emit('newEmail', { 
  //   from: "willyumburjer@gmail.com",
  //   text: "TaddaImhome",
  //   createAt: new Date().getTime() 
  // })
 
})



app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Connecting to port ${port}`);
})
