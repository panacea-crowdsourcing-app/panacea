var models = require('./database/index.js');
var models = models()
  , Web_SMS = models.Web_SMS
  , Disease_Incidence = models.Disease_Incidence
  , Social_Media = models.Social_Media;
console.log(models);
// var express = require('express');
// var app = express();

var sequelize = require('./database/database.js');



var log = function(inst) {
  console.dir(inst.get());
};

exports.postMethod = function(req, res) {
  console.log(req.body);
  // res.json(req.body);
  Web_SMS.create({
    persons_name: req.body.persons_name,
    email: req.body.email,
    phone: req.body.phone,
    diseasename: req.body.diseasename,
    text: req.body.text,
    incidence_address: req.body.incidence_address,
    incidence_city: req.body.incidence_city,
    incidence_state: req.body.incidence_state,
    incidence_zip: req.body.incidence_zip,
    population: req.body.population,
    incidence_country: req.body.incidence_country,
    no_of_cases: req.body.no_of_cases,
    source_type: req.body.source_type,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    date: req.body.date
  })
  .then(function(entry) {
    res.json(entry);
  });
};

exports.getMethod = function(req, res) {
  Web_SMS.findAll({})
    .then(function(posts) {
      posts.forEach(log);
      res.json({posts: posts});
      console.log(posts);
    });
};





