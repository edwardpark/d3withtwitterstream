var IOServer = require('socket.io');
var io = new IOServer(7000);


// Listen for new connections
io.on('connection', function (socket) {

    // Print the socket ID on connection
    console.log('Client ID ' + socket.id + ' connected.');

    // The server will emit a message when receiving the `client-message` event.
    socket.on('client-message', function (data) {
        console.log(data);
        socket.emit('server-message', {msg: 'Message "' + data.msg + '" received.'});
    });

    // Execute the callback if the client disconnects.
    socket.on('disconnect', function() {
        console.log('client disconnected.');
    });
});
