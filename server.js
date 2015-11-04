var express = require('express')
  , io = require('socket.io').listen(server)
  , http = require('http')
  , twitter = require('twit')
  , cronJob = require('cron').CronJob
  , _ = require('underscore')
  , path = require('path')
  , bodyParser = require("body-parser")
  , pg = require('pg') 
  , AlchemyAPI = require('./server/alchemyapi') // Uncomment lines 9 and 10 before push
  , alchemyapi = new AlchemyAPI()
  , keys = require('./server/twitterKeys')
  , request = require('request')
  //, sequelize = require('./server/database/database.js')
 // , models = require('./server/database/index.js')
  //, serverUtils = require('./server/serverUtils.js')
  , yandexKey = require('./server/yandexKey')
  , translate = require('yandex-translate-api')(yandexKey.key)
  , geoKey = require('./server/geocoder')
  , Promise = require('bluebird')
  , io = require('socket.io')
  , cronJob = require('cron').CronJob
  , twitterFeeds = require('./tweets')
  , jsonFile = require('jsonfile'); /*remember to remove used to remove after presentation*/



// var models = models()
//   , Web_SMS = models.Web_SMS
//   , Disease_Incidence = models.Disease_Incidence
//   , Social_Media = models.Social_Media;

var app = express();


var server = http.createServer(app);



// ############ Instantiate the twitter component ####################################

var t = new twitter({
  consumer_key: keys.consumer_key,
  consumer_secret: keys.consumer_secret,
  access_token: keys.access_token,
  access_token_secret: keys.access_token_secret
});



// #################### Express set-up #################################################

server.listen(process.env.PORT || 3000);

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//# ############### RestFul ##############################################################


// app.get('/api/globe', function(req, res) {
//   var results = [];

//   pg.connect(sequelize, function(err, client, done) {
//  // Handle connection errors
//     if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err});
//     } 
// // SQL Query > Select Data
//     var query = sequelize.client.query("SELECT * FROM messages");
//   });
// // Stream results back one row at a time
//     query.on('row', function(row) {
//       results.push(row);
//       console.log(results);
//     });
// // After all data is returned, close connection and return results
//     query.on('end', function() {
//       return res.json(results);
//     });
//     res.send('');
//   });

//# ###############  CRUD ##############################################################

// app.post('/api/reports', serverUtils.postMethod);
// app.get('/api/globe',  serverUtils.getMethod);


//*******************Alchemy API Test Code PLease do no Delete **************************/

//Twitter symbols array
 var watchSymbols = ["malaria outbreaks", "malaria in Africa", "malaria in Asia", "parasitic disease","falciparum","ebola virus",
  "ebola outbreaks", "bird flu", "avian influenza","bird flu outbreaks","H5N1", "malaria WHO", "ebola WHO", "CDC ebola", "avian flu outbreaks", 
  "malaria symptoms", "ebola symptoms", "ebola outbreaks", "malaria", "ebola", "dengue", "avian", "African trypanosomiasis", "cholera", "cryptosporidiosis",  
  "HIV/AIDS", "influenza", "japanese encephalitis", "leishmaniasis", "Measles", "meningitis", "onchocerciasis", 'mumps', 'snail fever', "bilharzia",
  "pneumonia", "rotavirus", "schistosomiasis", "shigellosis", "strep throat", "tuberculosis", "typhoid", "yellow fever", "sleeping sickness", "rabies", "polio",
  "lassa fever", "leptospirosis", "crypto", "hepatitis A", "hepatitis B", "hepatitis C", "hemorrhagic fever" ];

//This structure will keep the total number of tweets received and a map of all the symbols and how many tweets received of that symbol
var watchList = {
  total: 0,
  symbols: {}
};
//Set the watch symbols to zero.
_.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });
var twitterFeeds = []; 
var stream = t.stream('statuses/filter', { track: watchSymbols, since: '2015-10-01' });
var streaming = null;

/**** Geocoder MapQuest ***/
var geocoderProvider = 'mapquest';
var httpAdapter = 'http';

var geoKey = {
  apiKey: geoKey.geoKey, // for Mapquest, OpenCage, Google Premier 
  formatter: null         // 'gpx', 'string', ... 
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, geoKey);


//############################# Sockets Integration ########################################//


// //Start a Socket.IO listen
// var sockets = io.listen(server);

// //THIS IS NECESSARY ONLY FOR HEROKU!
// sockets.configure(function() {
//   sockets.set('transports', ['xhr-polling']);
//   sockets.set('polling duration', 10);
// });

// //If the client just connected, fetch data from database
// sockets.sockets.on('connection', function(socket) { 
//   socket.emit('');
// });


// sockets.sockets.on('connection', function (socket) {
//   socket.on("start streaming", function() {
//     if (streaming === null) {
//       stream.on('tweet', function (tweet) {

//         if (tweet.user.location) {
//           if ()
//           var newTweet = {
//             date: tweet.created_at,
//             source_type: 'twitter',
//             location: tweet.user.location, 
//             text: tweet.text,
//             language: tweet.lang
//           };
//           console.log(newTweet);
//         }
//       });
//     }
//   });
// });

stream.on('tweet', function(tweet){

  if (tweet.user.location) {
    var newTweet = {
      date: tweet.created_at,
      source_type: 'twitter',
      location: tweet.user.location, 
      text: tweet.text,
      language: tweet.lang
    };
    twitterFeeds.push(newTweet);  
    console.log(newTweet);
    console.log(',');
  }
  //create a stopping point

});



//################################ Cron Job ################################################//
//stream at midnight each day
// new cronJob('0 0 0 * * *', function(){ 
//   //Send the update to the database
//   sockets.sockets.emit('tweet');

// }, null, true);


//#########################################################################################//

Promise.all(twitterFeeds)
  .then( function(tweets) {
  tweets.forEach( function(tweet) {
    //get lat and long
    geocoder.geocode(tweet.location, function(geoResponse) {
   })
  .then( function (location) {
    //latitude and longitude using mapQuest
    tweet.latitude = location[0].latitude;
    tweet.longitude = location[0].longitude;

    // non english translation using Yandex Translator
    return new Promise( function( resolve, reject){
      if(tweet.lang !== 'en') {
        translate.translate(tweet.text, function(error, yandexResponse) {
          if(yandexResponse.code === 200){
            tweet.text = yandexResponse.text[0];
            resolve(tweet);  
          }
        });
      }
    });    
  })
  .then(function(tweet){
     //sentiment analysis using Alchemy API
    return new Promise ( function (resolve, reject){
      alchemyapi.sentiment("text", tweet.text, {sentiment: 1}, function(response) {
        if( response["docSentiment"] && ((response["docSentiment"]["type"] === 'neutral' || response["docSentiment"]["type"] === 'negative') )){
          resolve(tweet);
        } else {
          reject(tweet);
        }
      }); 
    });
  

  })
  .then(function(tweet){
    //taxonomy analysis using Alchemy API
    var confident = false;
    return new Promise ( function (resolve, reject){
      alchemyapi.taxonomy("text", tweet.text, {sentiment: 1}, function(response, error) {
        response.taxonomy.forEach( function (taxon) {
          if (!taxon['confident'] && taxon['label'].split('/').indexOf("disease") > 0){
            confident = true;
          }
        });
        if (confident === true){
          resolve(tweet)
        }else{
          reject(tweet);
        }
      });
    });
  })
  .then(function(tweet){
    //disease classification
    var classified = false;
    return new Promise ( function (resolve, reject){
      alchemyapi.entities("text", tweet.text, {sentiment: 1}, function(response) {
        response.entities.forEach( function (entity) {
          if(entity['type']==="HealthCondition" ){
            classified = true;
            if(entity['disambiguated']){
              tweet.diseasename = entity['disambiguated']['name'].toUpperCase();
            } else {
              tweet.diseasename = entity['text'].toUpperCase();
            }
          }
        });
        if(classified){
          resolve(tweet);
        } else {
          reject(tweet);
        }      
      }); 
    });
  })
  .then(function(tweet){
    //push dummy data into a json file for now
    //remove after demo
    twitterFeeds.push(newTweet);
      //create json file
    return new Promise( function (resolve, reject){
      resolve
      jsonFile.writeFile(file, twitterFeeds, function (err) {
        if(err){
          console.error("error");
        }
      });
      
    });

    

    //save in the database
    // return new Promise( function (resolve, reject){
    //   resolve(
    //     Social_Media.create({    
    //       diseasename: tweet.diseasename,
    //       text: tweet.text,
    //       country: tweet.location,
    //       source_type: tweet.source_type,
    //       latitude: tweet.latitude,
    //       longitude: tweet.longitude,
    //       date: tweet.date
    //     })
    //   ); 
    // });
  })
  .then(function (entry){
    console.log("Tweets saved to database!");
    });
  })//
})
.catch(function (error){
  throw error;
});





