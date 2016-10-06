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
  "hotels": $hotelSelect,
  "restaurants": $restaurantSelect,
  "activities": $activitySelect // avoiding pluralization issues
}

function populateOptions (category){
  var category;
  $.ajax({
    method: 'GET',
    url: '/api/' + category,
  })
    .then(function (response) {
      response.forEach(makeOption, select[category]);
    })
    .catch(console.error)
}
Object.keys(select).forEach(e => {
  populateOptions(e);
})

// function ajaxNewDay(){
  // $.post('/api/days')
  // .then(function (data) { console.log('POST response data', data) })
  // .catch(console.error.bind(console));
// }
