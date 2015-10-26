var app = require('../../server.js')
  , Sequelize = require('sequelize')
  , sequelize = require('./database');

/*
Database connection configuration for heroku. Refer to Local configuration for parameters.
*/
// var sequelize = new Sequelize('', '', '', {
//     host:     '',
//     port:     5432,
//     dialect: "postgres",
//     native: true
//   });
/*

Database connection configuration for Local host.
*/
var sequelize = new Sequelize('panacea', 'postgres', 'md5e8e092439af890f7e6eae1224664963a', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  //schema: 'public'
 });

/*

/*
Establishes connection to database.
*/
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });


module.exports = function() {

 // ########################### SCHEMA ##################################

  var Social_Media = sequelize.define('posts', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  diseasename: Sequelize.String,
  text: Sequelize.Text,
  address: Sequelize.String,
  city: Sequelize.String,
  country: Sequelize.String,
  source_type: Sequelize.String,
  latitude: Sequelize.Float,
  longitude: Sequelize.Float,
  date: Sequelize.Date
  });

  var Web_SMS = sequelize.define('messages', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  persons_name: Sequelize.String,
  email: Sequelize.String,
  phone: Sequelize.Integer,
  text: Sequelize.Text,
  diseasename: Sequelize.String,
  text: Sequelize.Text,
  incidence_address: Sequelize.String,
  incidence_city: Sequelize.String,
  incidence_country: Sequelize.String,
  source_type: Sequelize.Text,
  latitude: Sequelize.Float,
  longitude: Sequelize.Float,
  date: Sequelize.Date
  });

  var Disease_Incidence = sequelize.define('incidences', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },    
    social_media: {
      type: Sequelize.Integer,
      references: {
        model: Social_Media,
        key: id
      },
     web_sms: {
      type: Sequelize.Integer,
      references: {
        model: Web_SMS,
        key:id
      }
     }
    }
  });

  /*
Set relationships between tables.
*/
Social_Media.hasMany(Disease_Incidence);
Web_SMS.hasMany(Disease_Incidence);

/*
Creates database structure.
*/
sequelize
  .sync({ force: true })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) { 
    console.log('An error occurred while creating the table:', err);
  });

  return{Social_Media: Social_Media, Web_SMS: Web_SMS, Disease_Incidence: Disease_Incidence};

};

