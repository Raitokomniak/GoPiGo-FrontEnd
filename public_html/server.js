var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'pug')

app.get('/', function (req, res) {
  res.render('index');
})

io.on('connection', function (client) {
  console.log('server message to server // server.js');

  client.on('join', function (data) {
    console.log(data + ' this is data');
    client.emit('messages', 'Server to client console');
  });

  client.on('command', function (cmd) {
    console.log(cmd + ' this is command')
    client.broadcast.emit('commands', 'order car')
  });
});

app.use(express.static('public'))
app.use(express.static(__dirname + '/node_modules'));

server.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})