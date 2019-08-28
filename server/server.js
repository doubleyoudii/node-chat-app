const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname + "/../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();

const {generateMessage, generateLocationMessage} = require('./utils/message');

io.on('connection', (socket) => {
  console.log('User Connected');

  
  socket.on('join', (params, cback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return cback('Name and Room name is required and must be Valid!');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUsersList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} Conneccted`));

    cback();
  });

  socket.on('createMessage', (message, cback) => {
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {

      //Sends newly Created Message to All client
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    //Acknoledgements````````````````
    cback();

  }); 
  
  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user) {

      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));

    }

  })

 
})



app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Connecting to port ${port}`);
})
