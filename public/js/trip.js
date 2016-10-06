'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var days = [],
      currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });
  function loadDay (day) {
    // if (this && this.blur) this.blur(); // removes focus box from buttons
    var newDay = dayModule.create(day); // dayModule
    // console.log("after");
    days.push(newDay);
    if (days.length === 1) {
      currentDay = newDay;
    }
    switchTo(newDay);
  }


  function addDay () {
    if (this && this.blur) this.blur(); // removes focus box from buttons
    var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
    days.push(newDay);
    if (days.length === 1) {
      currentDay = newDay;
    }
    switchTo(newDay);
  }

  function ajaxDeleteDay(id){
    $.ajax({
      method: 'DELETE',
      url: '/api/days/' + id,
    })
      .then(function (response){
        console.log("Destroyed!")
        ajaxUpdateDay(); // MUST call this after, otherwise it may run too soon b/c of async
      })
      .catch(console.error.bind(console));
  }

  function ajaxUpdateDay() {
    console.log("Hitting update day")
    $.ajax({
      method: 'PUT',
      url: '/api/days/update-days',
    })
    .then(function (response) {
      console.log("Updated!")
    })
    .catch(console.error.bind(console));
  }

  function deleteCurrentDay () {
    // prevent deleting last day
    if (days.length < 2 || !currentDay) return;
    // remove from the collection
    var index = days.indexOf(currentDay),
      previousDay = days.splice(index, 1)[0],
      newCurrent = days[index] || days[index - 1];
      console.log(currentDay);
      console.log(previousDay, newCurrent);
    ajaxDeleteDay(currentDay.number);
    // fix the remaining day numbers
    days.forEach(function (day, i) {
      day.setNumber(i + 1);
      // need to save these numbers to database - ajax PUT request?
      // console.log(day);
    });
    switchTo(newCurrent);
    previousDay.hideButton();
  }

  // globally accessible module methods

  var publicAPI = {

    load: function() {
      $.get('/api/days')
      .then(function (data) {
        data.forEach(e => {
          loadDay(e);
        })
      })
      .catch(console.error.bind(console));
    },

    add: function () {
      $(addDay);
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
