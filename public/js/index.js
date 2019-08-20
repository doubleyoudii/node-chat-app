var socket = io();

var messageForm = document.getElementById('message_form');

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

  var ul = document.querySelector('.chatbox');
  var mk = `
  <li class="chatbox_list">${message.from}: ${message.text}</li>
  `;

  ul.insertAdjacentHTML('beforebegin', mk);
});


//Acknoledgements````````````````
// socket.emit('createMessage', {
//   from: 'katiie',
//   text: 'Hi powzcx'
// }, function(data) {
//   console.log('Got this', data);
// });

$('#message_form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function() {
    console.log('sent');
  });

  document.querySelector('.message_form-text').value = "";
});