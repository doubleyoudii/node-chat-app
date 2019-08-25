// var moment = require('moment');

//Selectors```````````````````````````````
var messageTemplate = document.querySelector('#message-template');
var locMessageTemplate = document.querySelector('#location-message-template');
var messageForm = document.getElementById('message_form');
var locationButton = document.getElementById('send-location');
var ul = document.querySelector('#chatbox');

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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = messageTemplate.innerHTML;
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  ul.insertAdjacentHTML('beforebegin', html);

  // console.log('New message receive ', message);
  // var formattedTime = moment(message.createdAt).format('h:mm a');

  // var ul = document.querySelector('#chatbox');
  // var mk = `
  // <li class="chatbox_list">${message.from} ${formattedTime} : ${message.text} </li>
  // `;

  // ul.insertAdjacentHTML('beforebegin', mk);
});

socket.on('newLocationMessage', function(location) {
  var formattedTime = moment(location.createdAt).format('h:mm a');
  var template = locMessageTemplate.innerHTML;
  var html = Mustache.render(template, {
    url: location.url,
    from: location.from,
    createdAt: formattedTime
  });
  
  ul.insertAdjacentHTML('beforebegin', html);

  // var string = `
  // <li class="chatbox_list">${location.from} ${formattedTime}: <a href="${location.url}" target="_blank">This is my location</a></li>
  // `
  // console.log(location.url);
  // ul.insertAdjacentHTML('beforebegin', string);
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
    //acknowledgement
    document.querySelector('.message_form-text').value = "";
  });

  
});

locationButton.addEventListener('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser!');
  }

  $('#send-location').prop('disabled', true).text('Sending Location...');

  //$("input").prop('disabled', true);
  //$("input").prop('disabled', false);

  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude

    });     

    $('#send-location').prop('disabled', false).text('Sending Location');
  }, function() {
    $('#send-location').prop('disabled', false).text('Sending Location');
    alert('Unable to fetch location'); 
  });
});