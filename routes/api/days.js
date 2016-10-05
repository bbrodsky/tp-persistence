var express = require('express')
var dayRouter = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

dayRouter.get("/", function(req, res, next) {
  res.send("HELLOOOOO")
  // Day.findAll()
  //   .then(function (days){
  //     res.json(days)
  //   })
  //   .catch(next)
})


dayRouter.post('/:id/restaurants', function (req, res, next) {
  Day.findById(req.params.id)
    .then(function (day) {
      console.log(day)
    })
    .catch(next)
})



module.exports = dayRouter;
