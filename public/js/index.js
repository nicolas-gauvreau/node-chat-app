var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});
socket.on('newMessage', function(newMessage) {
  var template = jQuery('#message-template').html();
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    text: newMessage.text,
    from: newMessage.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

});
socket.on('newLocationMessage', function(newMessage) {
  var template = jQuery('#location-message-template').html();
  var formattedTime = moment(newMessage.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: newMessage.from,
    url: newMessage.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);

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
