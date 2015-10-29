var Sequelize = require('sequelize');
// var sequelize = new Sequelize(process.env.DATABASE_URL);
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/panacea';
var sequelize = new Sequelize(connectionString);

var client = new pg.Client(connectionString);
client.connect();

module.exports = sequelize;