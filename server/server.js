const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + "/../public");
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.emit('newMessage', {
    from: "willyumburjer@gmail.com",
    text: "testing New Message function",
    createAt: new Date().getTime() 
  })

  socket.on('createMessage', (message) => {
    console.log('New message receive ', message);
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
