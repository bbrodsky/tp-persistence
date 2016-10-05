var express = require('express')
var apiRouter = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');


apiRouter.get('/:attractions', function (req, res, next) {
  if (req.params.attractions === 'hotels'){
    Hotel.findAll()
      .then(function (hotels) {
        res.json(hotels)
      })
      .catch(next)
  } else if (req.params.attractions === 'restaurants'){
    Restaurant.findAll()
      .then(function (restaurants) {
        res.json(restaurants)
      })
      .catch(next)
  } else if (req.params.attractions === 'activities'){
    Activity.findAll()
      .then(function (activities) {
        res.json(activities)
      })
      .catch(next)
  }
})


module.exports = apiRouter;
