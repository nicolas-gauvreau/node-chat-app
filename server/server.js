const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);

    users.removeUser(socket.id);
    var user = users.addUser(socket.id, params.name, params.room);

    socket.emit('newMessage', generateMessage('Admin', `${user.name}, welcome to Chat-App`));
    socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} joined`));
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      var broadcasted = generateMessage(user.name, message.text);
      io.to(user.room).emit('newMessage', broadcasted);
    }
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `User ${user.name} has left the room.`))
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
