var socket = io();

socket.on('connect', function() {
  console.log("Connected to the server");

  // socket.emit('createMessage', {
  //   to: 'kate@example.com',
  //   text: "Hi powcxxzxc"
  // }); 
});


socket.on('disconnect', function() {
  console.log("Disconnect from the server");

  
});

// socket.on('newEmail', function(email) {
//   console.log('New email receive ', email);
// });
socket.on('newMessage', function(message) {
  console.log('New message receive ', message);
});