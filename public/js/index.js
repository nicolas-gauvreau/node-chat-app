var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
socket.on('newMessage', function(newMessage) {
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
  jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(newMessage) {
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${newMessage.from} ${formattedTime}:`);
  a.attr('href', newMessage.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }
  locationButton.attr('disabled', 'disabled');
  locationButton.text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {

    locationButton.removeAttr('disabled');
    locationButton.text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });

  }, function () {
    locationButton.removeAttr('disabled');
    locationButton.text('Send location');

    alert('Unable to fetch location.');
  });
});
