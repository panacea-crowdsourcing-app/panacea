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
  //, models = require('./server/database/index.js')
  // , jsonFile = require('jsonfile') remember to remove used to observe dummy data
  , yandexKey = require('./server/yandexKey')
  , translate = require('yandex-translate-api')(yandexKey.key)
  , geoKey = require('./server/geocoder');

// var  models = models()
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

//Set the sockets.io configuration.
//THIS IS NECESSARY ONLY FOR HEROKU!
// sockets.configure(function() {
//   sockets.set('transports', ['xhr-polling']);
//   sockets.set('polling duration', 10);
// });

// #################### Express set-up #################################################

server.listen(process.env.PORT || 3000);

// app.set('views', __dirname + '/client');
// app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/globe', function(req, res) {
//   var results = [];

//   pg.connect(sequelize, function(err, client, done) {
//  // Handle connection errors
//      if(err) {
//       done();
//       console.log(err);
//       return res.status(500).json({ success: false, data: err});
//     } 
// // SQL Query > Select Data
//     var query = sequelize.client.query("SELECT * FROM messages");
//   })
// // Stream results back one row at a time
//     query.on('row', function(row) {
//         results.push(row);
//         console.log(results);
//     });
// // After all data is returned, close connection and return results
//     query.on('end', function() {
//         return res.json(results);
//     });
//     res.send('')
//   });



/*******************Alchemy API Test Code PLease do no Delete **************************/
// //Twitter symbols array
//  var watchSymbols = ["malaria outbreaks", "malaria in Africa", "malaria in Asia", "parasitic disease","falciparum","ebola virus",
//  "ebola outbreaks", "bird flu", "avian influenza","bird flu outbreaks","H5N1", "malaria WHO", "ebola WHO", "CDC ebola", "avian flu outbreaks", 
//  "malaria symptoms", "ebola symptoms", "ebola outbreaks", "malaria", "ebola", "dengue", "avian" ];

// //This structure will keep the total number of tweets received and a map of all the symbols and how many tweets received of that symbol
// var watchList = {
//   total: 0,
//   symbols: {}
// };
// //Set the watch symbols to zero.
// _.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });
// var file = 'tweetFile.json';
// var twitterFeeds = []; 
// var stream = t.stream('statuses/filter', { track: watchSymbols, since: '2015-10-01' });

// /**** Geocoder MapQuest ***/
// var geocoderProvider = 'mapquest';
// var httpAdapter = 'http';

// var geoKey = {
//   apiKey: geoKey.geoKey, // for Mapquest, OpenCage, Google Premier 
//   formatter: null         // 'gpx', 'string', ... 
// };

// var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, geoKey);


// // var Social_Media = sequelize.define('posts', {
// //     id: {
// //     type: Sequelize.INTEGER,
// //     primaryKey: true,
// //     autoIncrement: true
// //   },
// //   diseasename: Sequelize.STRING, //keyword - alchemy field
// //   text: Sequelize.TEXT, // tweet.text
// //   address: Sequelize.STRING, //not available
// //   city: Sequelize.STRING,  // may have //mostly not avaialable
// //   populaion: Sequelize.INTEGER,
// //   country: Sequelize.STRING,
// //   no_of_cases: Sequelize.INTEGER, // not available
// //   source_type: Sequelize.STRING, // twitter
// //   latitude: Sequelize.FLOAT, // geocoder conversion of tweets location fields
// //   longitude: Sequelize.FLOAT //geocoder
// //   });

//  //stream.on('tweet', function (tweet) {
  
// //    pg.connect(sequelize, function(err, client, done) {
// //  // Handle connection errors
// //      if(err) {
// //       done();
// //       console.log("here", err);
// //       return res.status(500).json({ success: false, data: err});
// //     } 
// // // SQL Query > Select Data

// //     var query = sequelize.client.query("INSERT INTO messages (diseasename,  text, source_type ) VALUES ('flu', '" + tweet.text + "','twitter')"  ); //??
// //   })
// // // Stream results back one row at a time
// //     query.on('row', function(row) {

// //         results.push(row);
// //         console.log(results);
// //     });
// // // After all data is returned, close connection and return results
// //     query.on('end', function() {

// //       return JSON.stringify(JSON.decycle(res.json(results)));
// //     });
// //     res.send('')
// //  });
// // //var stream = t.stream('statuses/sample');

// // var alchemyLanguages = ['en', 'fr', 'ru', 'pt', 'de', 'es', 'it']; //languages supported by ALCHEMY API

// //stream.on('tweet', function (tweet) {
//   // 1. determine text that needs direct translation; 
//         // translate to english
//         // parse the text thru for the alchemy api for sentiment analysis

//         // 

//   //2. since I can determine a location from text, extract all text that
//       //1. has a negative or neutral sentiment AND entity type = "HealthCondition"
//       //2. 


//   //The 
// //   if (alchemyLanguages.indexOf(tweet.lang) === -1) {
// //     translate.translate(tweet.text, function(err, res) {
// //       if(err){
// //         console.error(err)
// //       } else {
// //         if(res.code === 200){
// //           // translate to english => res.text
// //           // save tweet info to DB; do we want to preserve original text?
// //           if 
// //           console.log("Tweet: ", tweet.text, "twitter language: ", tweet.lang ,"language: ", res); 
// //         }
// //       }
      
// //      });
// //   }

// //     // NB: Yandex translate translate errors
// //       //         403: Exceeded the daily limit on the number of requests
// //       // 404: Exceeded the daily limit on the amount of translated text
// //       // 413: Exceeded the maximum text size
// //       // 422: The text cannot be translated
// //       // 501: The specified translation direction is not supported
// //     //pass thru alchemy (function call)
// //   // else 
// //     //pass thru alchemy (function call)
// //   //question - can node do this asynchronously? 
// //     //} else {
// //     //call alchemysentiment
// //     //save in DB - does this slow app down if I don't save in db
    

// // });


//  //Do entity analysis // if healthCondition && sentiment == -ve or positive
//     // find lat and long
// var latLong = function(location) { 
//     geocoder.geocode(tweet.user.location, function(err, res) {
//     return [res[0].latitude, res[0].longitude];
//   })
// };

// // var entitites = function (text) {
// //   alchemyapi.entities("text", tweet.text, {sentiment: 1}, function(response) {
// //    response.entities.forEach( function (entity) {
// //       return entity['type']==="HealthCondition" 
// //         console.log(tweet.text, response['entities']); //save the entities - check for location later
// //       }
// //     });
// //   });
// // }


// //filter user sentiment
// // stream.on('tweet', function (tweet) {
// //    //only interested in tweets that have location data
// //    //console.log(tweet);
// //   if(tweet.user.location){

// //     if (tweet.lang !== 'en') {
// //       // //translate to english
// //       // translate.translate(tweet.text, function(err, res) {
// //       //   if(err){
// //       //     console.error(err)
// //       //   } else {
// //       //     if(res.code === 200){
// //       //       // translate to english => res.text
// //       //       // save tweet info to DB; do we want to preserve original text?
// //       //       var english = res.text; 
// //       //       //console.log("Tweet: ", tweet.text, "twitter language: ", tweet.lang ,"language: ", res); 

// //       //       //find lat and logitude
// //       //       latLong(tweet.user.location); 
// //       //     }
// //       //   }
// //       // });
// //     } else {
// //       console.log(tweet);
// //       alchemyapi.taxonomy("text", tweet.text, {sentiment: 1}, function(response, error) {
// //         if(error){
// //           console.log(error);
// //         }else {
// //         response.taxonomy.forEach( function (taxon) {
// //           if (!taxon['confident'] && taxon['label'].split('/').indexOf("disease") > 0){
// //             alchemyapi.sentiment("text", tweet.text, {sentiment: 1}, function(response) {
// //               if( response["docSentiment"] && (response["docSentiment"]["type"] === 'neutral' || response["docSentiment"]["type"] === 'negative') ){
// //                 alchemyapi.entities("text", tweet.text, {sentiment: 1}, function(response) {
// //                   response.entities.forEach( function (entity) {
// //                     if(entity['type']==="HealthCondition" ){
// //                       //console.log(tweet.text, response['entities']); //save the entities - check for location later
// //                       geocoder.geocode(tweet.user.location, function(err, res) {
// //                         console.log([res[0].latitude, res[0].longitude]);
// //                         alert(found);
// //                       })
// //                     }
// //                   });
// //                 });
// //               }
// //             });
// //           }  
// //         });
// //       }
// //       });
     
// //     }
// //   }
// // });
    

// stream.on('tweet', function (tweet) {
//   if(tweet.user.location && tweet.lang === 'en'){
//     var confidence = false;
//     alchemyapi.taxonomy("text", tweet.text, {sentiment: 1}, function(response, error) {
//       if(error){
//           console.log(error);
//         }else {
//           response.taxonomy.forEach( function (taxon) {
//             if (!taxon['confident'] && taxon['label'].split('/').indexOf("disease") > 0){
//               confidence = true
//             }
//           });
//         }
//     });
//     if(confidence){
//       geocoder.geocode(tweet.user.location, function(err, res) {
//         console.log([res[0].latitude, res[0].longitude]);
//       });
//     }
    
//   }   
// });







