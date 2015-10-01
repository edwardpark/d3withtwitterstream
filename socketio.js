var IOServer = require('socket.io');
var io = new IOServer(7000);

// Listen for new connections
io.on('connection', function (socket) {

    console.log('Client ID ' + socket.id + ' connected.');

    socket.on('client-message', function (data) {
        console.log(data);
        socket.emit('server-message', {msg: 'Message "' + data.msg + '" received.'});
    });


    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
        console.log('client disconnected.');
    });
});
