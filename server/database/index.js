var app = require('../../server.js')
  , Sequelize = require('sequelize')
  , sequelize = require('./database')
  , dbLogin = require('./dbLogin');

if (process.env.DATABASE_URL) {
  // Heroku database connection
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: true
    }
  });
} else {
  // localhost database connection
  sequelize = new Sequelize('panacea', dbLogin.username, dbLogin.password, {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    define: {
      timestamps: false,
    }
  });
}

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
  population: Sequelize.INTEGER,
  country: Sequelize.STRING,
  no_of_cases: Sequelize.INTEGER,
  source_type: Sequelize.STRING,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  date: Sequelize.DATE
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
  diseasename: Sequelize.STRING,
  text: Sequelize.TEXT,
  incidence_address: Sequelize.STRING,
  incidence_city: Sequelize.STRING,
  incidence_state: Sequelize.STRING,
  incidence_zip: Sequelize.STRING,
  population: Sequelize.INTEGER,
  incidence_country: Sequelize.STRING,
  no_of_cases: Sequelize.INTEGER,
  source_type: Sequelize.TEXT,
  latitude: Sequelize.FLOAT,
  longitude: Sequelize.FLOAT,
  date: Sequelize.DATE
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
  .sync()
  .then(function(err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });

  return{Social_Media: Social_Media, Web_SMS: Web_SMS, Disease_Incidence: Disease_Incidence};

};

