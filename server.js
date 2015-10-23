var express = require('express')
  , io = require('socket.io').listen(server)
  , http = require('http')
  , twitter = require('twit')
  , cronJob = require('cron').CronJob
  , _ = require('underscore')
  , path = require('path')
  , bodyParser = require("body-parser") 
  // , AlchemyAPI = require('./server/alchemyapi') // Uncomment lines 9 and 10 before push
  // , alchemyapi = new AlchemyAPI()
  , keys = require('./server/twitterKeys')
  ,request = require('request')
  ,neo4j = require('node-neo4j');

var app = express();

var server = http.createServer(app);

// //Instantiate the twitter component
// var t = new twitter({
//     consumer_key: keys.consumer_key,
//     consumer_secret: keys.consumer_secret,
//     access_token: keys.access_token,
//     access_token_secret: keys.access_token_secret
// });

//Set the sockets.io configuration.
//THIS IS NECESSARY ONLY FOR HEROKU!
// sockets.configure(function() {
//   sockets.set('transports', ['xhr-polling']);
//   sockets.set('polling duration', 10);
// });

//Express set-up
server.listen(process.env.PORT || 3000);

// app.set('views', __dirname + '/client');
// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Twitter symbols array
var watchSymbols = ["malaria outbreaks", "malaria in Africa", "malaria in Asia", "parasitic disease","falciparum","ebola virus",
"ebola outbreaks", "bird flu", "avian influenza","bird flu outbreaks","H5N1", "malaria WHO", "ebola WHO", "CDC ebola", "avian flu outbreaks", 
"malaria symptoms", "ebola symptoms", "ebola outbreaks" ];

//This structure will keep the total number of tweets received and a map of all the symbols and how many tweets received of that symbol
var watchList = {
    total: 0,
    symbols: {}
};
//Set the watch symbols to zero.
_.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });

// var stream = t.stream('statuses/filter', { track: watchSymbols, language: 'en', since: '2015-10-01' });
 
// stream.on('tweet', function (tweet) {
//   console.log(tweet.text + tweet.user.date + tweet.user.location);

// });

//Define your host and port. This is where your database is running. Here it is defined on localhost.
var host = 'localhost',
    port = 7474;

  //This is the URL where we will POST our data to fire the cypher query. This is specified in Neo4j docs.
var httpUrlForTransaction = 'http://' + host + ':' + port + '/db/data/transaction/commit';

//Create a db object. We will using this object to work on the DB.
db = new neo4j('http://localhost:7474');

//Let’s define a function which fires the cypher query.
function runCypherQuery(query, params, callback) {
  request.post({
      uri: httpUrlForTransaction,
      json: {statements: [{statement: query, parameters: params}]}
    },
    function (err, res, body) {
      callback(err, body);
    })
}

//Run raw cypher with params
db.cypherQuery(
  'CREATE (somebody:Person { name: {name}, from: {company}, age: {age} }) RETURN somebody',
  {
    name: 'somebody',
    company: 'Modulus',
    age: ~~(Math.random() * 100) //generate random age
  }, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log(result.data); // delivers an array of query results
    console.log(result.columns); // delivers an array of names of objects getting returned
  }
);



