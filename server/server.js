const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 5000;
const publicPath = path.join(__dirname, '../public/');

app.use(express.static(publicPath));


io.on('connection', (socket)=>{
  console.log('New User Connected');


  socket.on('join', (params, callback) => {
      if(!isRealString(params.name) || !isRealString(params.room)){
        callback('Name and room name are required');
      }else{
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app nigguh.'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
      }
  });
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    let user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
      callback('This is from the server');
        }

  });

  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  })
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      socket.broadcast.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
    console.log('User disconnected.');
  })
});

server.listen(port, () =>{
  console.log(`App is listening on port: ${port}...`);
});
