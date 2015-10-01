export default {};

var Twitter = require('twit-stream');
var keys =require('./authentication.js');


var stream = new Twitter(keys).stream('statuses/sample');

/// connection configuration for stream object to connect to API

stream.on('connected', function(msg) {
    console.log('Connection successful.');
});

stream.on('reconnect', function(req, res, interval) {
    console.log('Reconnecting in ' + (interval / 1e3) + ' seconds.');
});

stream.on('disconnect', function(msg) {
    console.log('Twitter disconnection message');
    console.log(msg);
});
