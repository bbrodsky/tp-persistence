var express = require('express')
var dayRouter = express.Router();
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');
var Day = require('../../models/day');

dayRouter.get("/", function(req, res, next) {
  Day.findAll()
    .then(function (days){
      res.json(days)
    })
    .catch(next)
})

dayRouter.post("/", function(req, res, next) {
  Day.findAll()
    .then(function(days) {
      Day.create({
        number: days.length+1
      });
    })
    .catch(next);
})

dayRouter.get("/:id", function(req, res, next) {
  Day.findById(req.params.id)
    .then(function (day){
      res.json(day);
    })
    .catch(next)
})

dayRouter.delete("/:id", function(req, res, next) {
  Day.findById(req.params.id)
    .then(function (day){
      day.destroy();
    })
    .then(function() {
      res.sendStatus(204);
    })
    .catch(next)
})


dayRouter.post('/:id/:attraction', function (req, res, next) {
  Day.findById(req.params.id)
    .then(function (day) {
      console.log(day)
    })
    .catch(next)
})



module.exports = dayRouter;
