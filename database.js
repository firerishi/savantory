// var db = require('mongoskin')
//   .db('mongodb://localhost:27017/savantory');

// mongodb://<dbuser>:<dbpassword>@ds041160.mongolab.com:41160/savantory

var db = require('mongoskin')
  .db('mongodb://firerishi:firebolt@ds041160.mongolab.com:41160/savantory');

module.exports = db