var express = require('express')
  , io = require('socket.io').listen(server)
  , http = require('http')
  , twitter = require('ntwitter')
  , cronJob = require('cron').CronJob
  , _ = require('underscore')
  , path = require('path')
  , bodyParser = require("body-parser")
  , AlchemyAPI = require('./server/alchemyapi')
  , alchemyapi = new AlchemyAPI()
  , keys = require('./server/twitterKeys');


var app = express();

var server = http.createServer(app);

//Instantiate the twitter component
var t = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
});

//Set the sockets.io configuration.
//THIS IS NECESSARY ONLY FOR HEROKU!
// sockets.configure(function() {
//   sockets.set('transports', ['xhr-polling']);
//   sockets.set('polling duration', 10);
// });

//Express set-up
server.listen(process.env.PORT || 3000);
app.set('views', __dirname + '/client');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Twitter symbols array
var watchSymbols = ['ebola'];
//This structure will keep the total number of tweets received and a map of all the symbols and how many tweets received of that symbol
var watchList = {
    total: 0,
    symbols: {}
};
//Set the watch symbols to zero.
_.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });


t.stream('statuses/filter', { track: watchSymbols}, function(stream) {
  stream.on('data', function (data) {
    console.log(data);
  });
});

//Tisha's fiddle
// t.stream('statuses/filter', { track: watchSymbols}, function(stream) {
//   stream.on('data', function (data) {
//     alchemyapi.sentiment("text", data.text, {sentiment: 1}, function(response) {
//       console.log("Sentiment: " + response["docSentiment"]["type"]);
//     });
//     // console.log(data);
//   });
// });


