var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER
  }
});


Day.belongsTo(Hotel);

// belongs to many association requires a join table
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day-activity'})

module.exports = Day;
