// var moment = require('moment');

//Selectors```````````````````````````````
var messageTemplate = document.querySelector('#message-template');
var locMessageTemplate = document.querySelector('#location-message-template');
var messageForm = document.getElementById('message_form');
var locationButton = document.getElementById('send-location');
var ul = document.querySelector('#chatbox');

var socket = io();


//SCROLL Effect`````````````````````````````````
function scrollToBottom () {

  //SELECTORS
  var messages = $("#dib");
  // var newMessage = $("#dib");
  var newMessage = $("#dib").children("li");


  //HEIGHTs
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    // console.log('Must scroll!!!');
    messages.scrollTop(scrollHeight);
  }
  // console.log(newMessage, clientHeight , scrollTop , newMessageHeight , lastMessageHeight, scrollHeight);
}


//


socket.on('connect', function() {
  console.log("Connected to the server");

});


socket.on('disconnect', function() {
  console.log("Disconnect from the server");

  
});


socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = messageTemplate.innerHTML;
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  ul.insertAdjacentHTML('beforebegin', html);
  scrollToBottom();
 
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
  scrollToBottom();

});

//Acknoledgements````````````````
//


//EVENTS```````````````````````````````````````````````````````
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