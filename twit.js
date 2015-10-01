// Import node modules
var Twit   = require('twit');
var  config = require('./authentication.js');
var T = new Twit(config);
//var stream = T.stream('statuses/sample');

var subjects =["donuts"];
var stream = T.stream('statuses/filter', {track: subjects});

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
})

stream.on('disconnect', function(message) {
    console.log('Twitter disconnection message');
    console.log(message);
});

//test tweet
stream.on('tweet', function(tweet) {
    // Displays the tweet in the console
    console.log('[@' + tweet.user.screen_name + ']: ' + tweet.text);
});
