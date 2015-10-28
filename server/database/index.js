var app = require('../../server.js')
  , Sequelize = require('sequelize')
  , sequelize = require('./database');
  , dbLogin = require('./dbLogin');

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
var sequelize = new Sequelize('panacea', dbLogin.username, dbLogin.password, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
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
  diseasename: Sequelize.STRING,
  text: Sequelize.TEXT,
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  populaion: Sequelize.INTEGER,
  country: Sequelize.STRING,
  no_of_cases: Sequelize.INTEGER,
  source_type: Sequelize.STRING,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
    }
  });

  var Web_SMS = sequelize.define('messages', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  persons_name: Sequelize.STRING,
  email: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  text: Sequelize.TEXT,
  diseasename: Sequelize.STRING,
  text: Sequelize.TEXT,
  incidence_address: Sequelize.STRING,
  incidence_city: Sequelize.STRING,
  populaion: Sequelize.INTEGER,
  incidence_country: Sequelize.STRING,
  no_of_cases: Sequelize.INTEGER,
  source_type: Sequelize.TEXT,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
    }
  });

  var Disease_Incidence = sequelize.define('incidences', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },    
    social_media: {
      type: Sequelize.INTEGER,
      references: {
        model: Social_Media,
        key: 'id'
      },
     web_sms: {
      type: Sequelize.INTEGER,
      references: {
        model: Web_SMS,
        key:'id'
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

