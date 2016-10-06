function makeOption (databaseAttraction) {
  var $option = $('<option></option>') // makes a new option tag
    .text(databaseAttraction.name)
    .val(databaseAttraction.id);
  this.append($option); // add the option to the specific select
}

var $optionsPanel = $('#options-panel');
var $hotelSelect = $optionsPanel.find('#hotel-choices');
var $restaurantSelect = $optionsPanel.find('#restaurant-choices');
var $activitySelect = $optionsPanel.find('#activity-choices');

var select = {
  hotel: $hotelSelect,
  restaurant: $restaurantSelect,
  activitie: $activitySelect // avoiding pluralization issues
}

function populateOptions (category){
  var category;
  $.ajax({
    method: 'GET',
    url: '/api/' + category + 's',
  })
    .then(function (response) {
      response.forEach(makeOption, select[category]);
    })
    .catch(console.error)
}

populateOptions('restaurant')
populateOptions('hotel')
populateOptions('activitie')



// $.get('/api/days')
//   .then(function (data) { console.log('GET response data', data) })
//   .catch(console.error.bind(console));

$.post('/api/days')
.then(function (data) { console.log('POST response data', data) })
.catch(console.error.bind(console));

$.get('/api/days')
.then(function (data) { console.log('GET response data', data) })
.catch(console.error.bind(console));

// $.ajax({
//   method: 'DELETE',
//   url: '/api/days/1',
// })
//   .then(function (response){
//     console.log("Destroyed!")
//   })
//   .catch(console.error.bind(console));
