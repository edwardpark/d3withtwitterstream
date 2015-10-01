export default {};

var Twitter = require('twit-stream');
var keys =require('./authentication.js');


var stream = new Twitter(keys).stream('statuses/sample');

stream.pipe(objectHandler);
// Where objectHandler is an arbitrary write stream
