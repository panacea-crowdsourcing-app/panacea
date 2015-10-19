var express = require('express')
  , io = require('socket.io').listen(server)
  , http = require('http')
<<<<<<< HEAD
  , twitter = require('twit')
=======
  , twitter = require('ntwitter')
>>>>>>> 7aab954272c5137fef5b8b4e3a80bc1e492a30a4
  , cronJob = require('cron').CronJob
  , _ = require('underscore')
  , path = require('path')
  , bodyParser = require("body-parser")
  , AlchemyAPI = require('./server/alchemyapi')
  , alchemyapi = new AlchemyAPI()
  , keys = require('./server/twitterKeys');


var app = express();

var server = http.createServer(app);

<<<<<<< HEAD
////Instantiate the twitter component
var t = new twitter({
    consumer_key: 'XHt82KR3OHnFr03oVCGFal85d',
    consumer_secret: 'gbJObOVe4yftDLT4OrspjycOGbKmoCnOepxMgVzutSCflZSMtv',
    access_token: '2936332038-xfFZw4Qp6xIKmSX8LHF89qgwJ8IdnPt8YEwjyin',
    access_token_secret: 'LfLh0YqH5nGCb31qJ3j1S4zDY7JaOwa6OtV75vCjpLXhp'
=======
//Instantiate the twitter component
var t = new twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret
>>>>>>> 7aab954272c5137fef5b8b4e3a80bc1e492a30a4
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

<<<<<<< HEAD
//Twitter symbols array
var watchSymbols = ["malaria outbreaks", "malaria in Africa", "malaria in Asia", "parasitic disease","falciparum","ebola virus",
"ebola outbreaks", "bird flu", "avian influenza","bird flu outbreaks","H5N1", "malaria WHO", "ebola WHO", "CDC ebola", "avian flu outbreaks", 
"malaria symptoms", "ebola symptoms", "ebola outbreaks" ];
=======
// Twitter symbols array
var watchSymbols = ['ebola'];
>>>>>>> 7aab954272c5137fef5b8b4e3a80bc1e492a30a4
//This structure will keep the total number of tweets received and a map of all the symbols and how many tweets received of that symbol
var watchList = {
    total: 0,
    symbols: {}
};
//Set the watch symbols to zero.
_.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });
<<<<<<< HEAD
=======


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
>>>>>>> 7aab954272c5137fef5b8b4e3a80bc1e492a30a4


var stream = t.stream('statuses/filter', { track: watchSymbols, language: 'en', since: '2015-10-01' })
 
stream.on('tweet', function (tweet) {
  console.log(tweet.text + tweet.user.date + tweet.user.location);
})
