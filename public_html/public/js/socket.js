var socket = io.connect('http://localhost:3000');
socket.on('connect', function(data) {
   socket.emit('join', 'client message to server // socket.js');
});

socket.on('messages', function(data)
{
    console.log(data)
});