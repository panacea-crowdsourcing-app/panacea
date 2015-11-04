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
  , sequelize = require('./server/database/database.js')
  , models = require('./server/database/index.js')
  , serverUtils = require('./server/serverUtils.js')
  //, jsonFile = require('jsonfile') //remember to remove used to observe dummy data
  , yandexKey = require('./server/yandexKey')
  , translate = require('yandex-translate-api')(yandexKey.key)
  , geoKey = require('./server/geocoder')
  , Promise = require ('bluebird');

var models = models()
  , Web_SMS = models.Web_SMS
  , Disease_Incidence = models.Disease_Incidence
  , Social_Media = models.Social_Media;

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

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//# ############### RestFul ##############################################################

app.get('/api/globe', function(req, res) {
  var results = [];

  pg.connect(sequelize, function(err, client, done) {
 // Handle connection errors
     if(err) {
      done();
      console.log(err);
      return res.status(500).json({ success: false, data: err});
    }
// SQL Query > Select Data
    var query = sequelize.client.query("SELECT * FROM messages");
  });
// Stream results back one row at a time
    query.on('row', function(row) {
        results.push(row);
        console.log(results);
    });
// After all data is returned, close connection and return results
    query.on('end', function() {
        return res.json(results);
    });
    res.send('');
  });


//# ###############  CRUD ##############################################################

app.post('/api/reports', serverUtils.postMethod);
app.get('/api/globe',  serverUtils.getMethod);


//*******************Alchemy API Test Code PLease do no Delete **************************/

//Twitter symbols array
 var watchSymbols = ["malaria outbreaks", "malaria in Africa", "malaria in Asia", "parasitic disease","falciparum","ebola virus",
 "ebola outbreaks", "bird flu", "avian influenza","bird flu outbreaks","H5N1", "malaria WHO", "ebola WHO", "CDC ebola", "avian flu outbreaks",
 "malaria symptoms", "ebola symptoms", "ebola outbreaks", "malaria", "ebola", "dengue", "avian" ];

//This structure will keep the total number of tweets received and a map of all the symbols and how many tweets received of that symbol
var watchList = {
  total: 0,
  symbols: {}
};
//Set the watch symbols to zero.
_.each(watchSymbols, function(v) { watchList.symbols[v] = 0; });
var file = 'tweetFile.json';
var twitterFeeds = [];
var stream = t.stream('statuses/filter', { track: watchSymbols, since: '2015-10-01' });


/**** Geocoder MapQuest ***/
var geocoderProvider = 'mapquest';
var httpAdapter = 'http';

var geoKey = {
  apiKey: geoKey.geoKey, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, geoKey);

var latLong = function(location) {
    geocoder.geocode(tweet.user.location, function(err, res) {
    return [res[0].latitude, res[0].longitude];
  });
};

/*****************************************************************************/


// stream.on('tweet', function(tweet){

//   if (tweet.user.location) {
//     var newTweet = {
//       date: tweet.created_at,
//       source_type: 'twitter',
//       location: tweet.user.location,
//       text: tweet.text,
//       language: tweet.lang
//     };
//     twitterFeeds.push(newTweet);
//     console.log(newTweet);
//   }
//   //create a stopping point

// });

// testing array
twitterFeeds = [{ date: 'Sat Oct 31 21:52:18 +0000 2015',
  source_type: 'twitter',
  location: 'Santo Domingo, RD.',
  text: 'RT @DaniloPaulinoR: Comisión Nacional de Energía asesta duro golpe al dengue - https://t.co/FWCNiG8vWC @cne_rd',
  language: 'es' },
{ date: 'Sat Oct 31 21:52:36 +0000 2015',
  source_type: 'twitter',
  location: 'Angola',
  text: '#FORÇA_SUPREMA \n\n°• Espalha tipo ebola•°\n\nPatrão da zOna ✌󾭻#Foii',
  language: 'pt' },
{ date: 'Sat Oct 31 21:52:40 +0000 2015',
  source_type: 'twitter',
  location: 'Mexico',
  text: 'Tienes dengue? — Si https://t.co/MsaQxk1Wmg',
  language: 'es' },
{ date: 'Sat Oct 31 21:52:40 +0000 2015',
  source_type: 'twitter',
  location: 'Mexico',
  text: 'I have dengue',
  language: 'en' },
{ date: 'Sat Oct 31 21:52:40 +0000 2015',
source_type: 'twitter',
location: 'Mexico',
text: 'I love my boyfriend',
language: 'en' },
{ date: 'Mon Nov 02 13:15:58 +0000 2015',
  source_type: 'twitter',
  location: 'nyköping',
  text: 'Hahahah vrf så skön och skämtar om ebola @LizetteLundh &lt;/3 https://t.co/Eg2UTPn5Kc',
  language: 'sv' },
{ date: 'Mon Nov 02 13:15:59 +0000 2015',
  source_type: 'twitter',
  location: 'Rochester, NY',
  text: 'I sont even ask ebola questions at work anymore',
  language: 'en' },
{ date: 'Mon Nov 02 13:16:01 +0000 2015',
  source_type: 'twitter',
  location: 'Toulouse, Midi-Pyrénées',
  text: 'RT @RTI_Officiel: Guinée- Un bébé né de "parents saints" a été déclaré positif au virus Ebola dans la préfecture de Forécariah. @rti_offici…',
  language: 'fr' },
{ date: 'Mon Nov 02 13:16:18 +0000 2015',
  source_type: 'twitter',
  location: 'Cameroun Douala',
  text: 'RT @afrikfoot: La FIFA et Eto’o engagés dans la lutte contre le virus Ebola https://t.co/rpyOGyteKJ',
  language: 'fr' },
{ date: 'Mon Nov 02 13:16:26 +0000 2015',
  source_type: 'twitter',
  location: 'lescout',
  text: 'RT @expertisefrance: #RetexEbola : les acteurs de la lutte contre Ebola réunis à Paris pour partager leurs expériences ! @AnnickGirardin ht…',
  language: 'fr' },
{ date: 'Mon Nov 02 13:16:38 +0000 2015',
  source_type: 'twitter',
  location: 'Scot | Inuit | Skandinavien',
  text: 'Newsroom HIV | Malaria remains the number one cause of hospitalisation and death in Africa - Despite this decrease… https://t.co/IcuYpz6s6A',
  language: 'en' },
{ date: 'Mon Nov 02 13:16:39 +0000 2015',
  source_type: 'twitter',
  location: 'Oriente. Venezuela',
  text: '#LineaVitalSalud Incidencia del dengue ha aumentado 30 veces en los últimos 50 años https://t.co/TxAHmSyIzo',
  language: 'es' },
{ date: 'Mon Nov 02 13:16:41 +0000 2015',
  source_type: 'twitter',
  location: 'USA',
  text: 'Daily Deals &gt;&gt; https://t.co/Lrs6XpjwpD #0092 AVIAN-X AXF OUTFITTER FLOCKED CANADA GOOSE LESSER DECOY 12 PACK WITH … https://t.co/fMiBanxvAs',
  language: 'en' },
{ date: 'Mon Nov 02 13:16:44 +0000 2015',
  source_type: 'twitter',
  location: 'WORLDWIDE ',
  text: 'HIV : Malaria remains the number one cause of hospitalisation and death in Africa - Despite this decrease, Mal... https://t.co/7Ix6FlM2jw',
  language: 'en' },
{ date: 'Mon Nov 02 13:17:00 +0000 2015',
  source_type: 'twitter',
  location: 'Evreux, FRANCE',
  text: 'RT @laFHF: En direct w/ @manuelvalls salue la mobilisation sans relâche des hospitaliers publics : #Ebola, grippe, #ambulatoire https://t.c…',
  language: 'fr' },
{ date: 'Mon Nov 02 13:17:38 +0000 2015',
  source_type: 'twitter',
  location: 'Alpes de Haute Provence (04)',
  text: 'Immobilier : Hollande distribue du PTZ comme d’autres la malaria https://t.co/MlgxLIAtFI',
  language: 'fr' },
{ date: 'Mon Nov 02 13:17:42 +0000 2015',
  source_type: 'twitter',
  location: '| 803, SC | 919, NC | ',
  text: 'I\'ll let you guys know if I have the Ebola.',
  language: 'en' },
{ date: 'Mon Nov 02 13:17:43 +0000 2015',
  source_type: 'twitter',
  location: 'Santo Domingo',
  text: 'Inapa se integra a la guerra contra el dengue con más de mil empleados https://t.co/HKSKLOaGRz https://t.co/4TV1V0fDSY',
  language: 'es' },
{ date: 'Mon Nov 02 13:17:57 +0000 2015',
  source_type: 'twitter',
  location: 'Rep Dominicana',
  text: 'Energía y Minas se suma a prevención de con suersonal y el liderazgo comunitario de Cotuí | https://t.co/ziaFfYTyao https://t.co/njVl0eeFIB',
  language: 'es' },
{ date: 'Mon Nov 02 13:18:20 +0000 2015',
  source_type: 'twitter',
  location: 'Bahía Blanca, Argentina',
  text: 'Que lindos bosteros avian ayer 👌😆😘💓❤',
  language: 'es' }
];



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
          resolve(tweet);
        } else {
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
    //save in the database
    return new Promise( function (resolve, reject){
      resolve(
        Social_Media.create({
          diseasename: tweet.diseasename,
          text: tweet.text,
          country: tweet.location,
          source_type: tweet.source_type,
          latitude: tweet.latitude,
          longitude: tweet.longitude,
          date: tweet.date
        })
      );
    });
  })
  .then(function (entry){
    console.log("Tweets saved to database!");
  });
  });//
})
.catch(function (error){
    throw error;
});




