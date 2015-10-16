var express = require('express')
  , io = require('socket.io').listen(server)
  , http = require('http')
  , twitter = require('twitter')
  , cronJob = require('cron').CronJob
  , _ = require('underscore')
  , path = require('path')
  ,bodyParser = require("body-parser");


var app = express();

var server = http.createServer(app);

//Twitter symbol array
var watchSymbols = ['$ebola', '$malaria', '$deneguefever'];

//Object to store total number of tweets received and their associated symbol
var watchList = {
    total: 0,
    symbols: {}
};

//Set the watchsymbols to zero
_.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });

//Express set-up
server.listen(process.env.PORT || 3000);
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

////Instantiate the twitter component
var t = new twitter({
    consumer_key: 'vk0Ox8UD5Q7m3QBedOe4lsP3m',
    consumer_secret: 'yktVjsVbcMnZACTZWTmioAj53PY3mjP8btcZk0LSuPe0fRHwow',
    access_token_key: '2936332038-OFFkA2uR8AAjd2Xt0kQq4pfi2H8CKCJjP7E04hr',
    access_token_secret: 'Y0EfMv7RPswmPJOhYhG8RJtsU7nrkhBQQsdbpRBPvrygY'
});

//Set the sockets.io configuration.
//THIS IS NECESSARY ONLY FOR HEROKU!
// sockets.configure(function() {
//   sockets.set('transports', ['xhr-polling']);
//   sockets.set('polling duration', 10);
// });

//If the client just connected, give them fresh data!
io.sockets.on('connection', function(socket) { 
    socket.on'data', function() {
      t.stream('statuses/filter', {track: watchSymbols}, function(stream) {
        stream.on('data', function(tweet) {
        console.log(tweet.text);    
      }); 
    });
});



//Tell the twitter API to filter on the watchSymbols 
t.stream('statuses/filter', {track: watchSymbols}, function(stream) {
  stream.on('data', function(tweet) {
    console.log(tweet.text);    
  });
   stream.on('error', function(error) {
    throw error;
  });
});

sockets.sockets.emit('data', watchList);
console.log('Shortly is listening on 3000');





