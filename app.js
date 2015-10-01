// Import the Node modules
var Twit     = require('twit'),              // Twitter API Client
    IOServer = require('socket.io'),         // Client-side communication
    config   = require('./authentication.js');  // Twitter Credentials

var topics = [];


// Create a new instance of the Socket Server
var port = 8000,
    io = new IOServer(port);

console.log('Listening for incoming connections in port ' + port);

io.on('connect', function(socket) {

    console.log('Client', socket.id, 'connected.');

    socket.on('add', function(topic) {
        // Adds the new topic to the topic list
        topics.push({
          word: topic.word,
          socket: socket
        });

        console.log('Adding the topic "' + topic.word + '"');
    });

});
