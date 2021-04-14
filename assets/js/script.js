var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var searchItem = $('.searchitem').val().trim(); 
var apiKey = '60fa7450d0005ff99e2958708928b28a';
var geoLoc = `http://api.openweathermap.org/geo/1.0/direct?q=${searchItem}&limit=5&appid=${apiKey}`;
var oneCallWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&appid=${apiKey}`;
var lat;
var long;
var city;

// getting the current date via method. *Might not be necessary*
var currentDay = moment().format('(MM/DD/YYYY)');
$('#date').text(currentDay);

// creating the search history
function displayHistory() {
  searchHistory.push(city);

  for (var i = 0; i < searchHistory.length; i++) {
      $('#history').add(`<li class="list-group-item pastBtn" data-city="${city}">`).text(searchHistory[i]);
  }
};


// Search button functionality
var searchButtonHandler = function(event) {
  event.preventDefault();

  city = searchItem;
  console.log(searchItem);
  displayHistory();

  if(city) {
  // geoAPI();
  // lat = ;
  // long = ;
  // weatherAPI();
  } else {
    // alert('Please enter a city')
    city;
  }
  $('input:text').val('');
};

// History button functionality
var historyButtonHandler = function(event) {
  var pastCity = event.target.attr('data-city')

  city = pastCity;
  // geoAPI();
  // lat = ;
  // long = ;
  // weatherAPI();
}

function geoAPI() {
// calling the API for location based on search bar to get latitude and longitude
  fetch(geoLoc)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
  //TODO: make your second call here so that you have access to "data"
  console.log(data);
    })
  .catch(function (err) {
    console.error(err);
  });
};

function weatherAPI() {
// calling the API for the weather of the searched location
  fetch(oneCallWeather)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
  //TODO: make your second call here so that you have access to "data"
  console.log(data);
    })
  .catch(function (err) {
    console.error(err);
  });
};

// Function to build weather cards
function weatherCards() {

};

$('.city-search').on('submit', searchButtonHandler);
$('.pastBtn').on('click', historyButtonHandler);