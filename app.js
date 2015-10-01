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

    socket.on('disconnect', function() {
      console.log('Client ' + socket.id + ' disconnected.');
      topics = topics.filter(function(topic) {
          return topic.socket.id !== socket.id;
      });
  });
});

////Twit Stream

var Twit   = require('twit');
var  config = require('./authentication.js');
var T = new Twit(config);
var filters= {locations: '-180,-90,180,90', language: 'en'};
var twitStream = T.stream('statuses/filter', filters);

// configurating connection
stream.on('connect', function(request) {
    console.log('Connection attempt.');
});

stream.on('connected', function(response) {
    console.log('Connection successful');
});

stream.on('reconnect', function(req, res, interval) {
    console.log('Reconnecting in ' + (interval / 1e3) + ' seconds.');
});


//warning limits
stream.on('warning', function(message) {
    console.warning('Twitter warning message:');
    console.warning(message);
});

stream.on('limit', function(message) {
    console.log('Twitter limit message:');
    console.log(message)
    twitStream.stop();
})

stream.on('disconnect', function(message) {
    console.log('Twitter disconnection message');
    console.log(message);
});

function twitOnTweet(tweet) {
    if (tweet.coordinates == false) {
        return;
    }

    var tweetText = tweet.text.toLowerCase();
    topics.forEach(function(topic) {
        if (tweetText.indexOf(topic.word) !== -1) {
            topic.socket.emit('tweet', {
                id: tweet.id,
                coordinates: tweet.coordinates,
                word: topic.word
            });
        }
    });
}
