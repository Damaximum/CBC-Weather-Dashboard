var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var apiKey = '60fa7450d0005ff99e2958708928b28a';
var lati;
var long;
var city;

// getting the current date via method.
var currentDay = moment().format('(MM/DD/YYYY)');
$('#date').text(currentDay);

// creating and updating the search history
function displayHistory() {
  var searchValue = $('#search-input').val().trim();
  if (searchHistory.indexOf(searchValue) === -1) {
  searchHistory.push(city);
  } else {
    var updateCity = searchHistory.indexOf(searchValue);
    // console.log(updateCity);
    searchHistory.splice(updateCity, 1);
    searchHistory.push(city);
  }
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  showHistory();
};

// show History
function showHistory() {
  $('#history').empty();
  for (var i = 0; i < searchHistory.length; i++) {
    var historySearch = $('<li class="list-group-item pastBtn">');
    historySearch.attr("data-city", searchHistory[i]);
    historySearch.text(searchHistory[i]);
    $('#history').prepend(historySearch);
  }
  $('#clearHistory').removeClass('hidden');
}

// Search button functionality
var searchButtonHandler = function(event) {
  event.preventDefault();
  var searchItem = $('#search-input').val().trim(); 
  if(searchItem) {
    city = searchItem;
    console.log(searchItem);
    geoAPI();
    displayHistory();
  } else {
      alert('Please enter a city')
      city;
  }
  $('input:text').val('');
};

// History button functionality
var historyButtonHandler = function() {
  console.log(this);
  var pastCity = $(this).attr('data-city');
  
  city = pastCity;
  geoAPI();
}

// Location api call
function geoAPI() {
  var geoLoc = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
// calling the API for location based on search bar to get latitude and longitude
  fetch(geoLoc)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
  console.log(data);
  lati = data[0].lat;
  long = data[0].lon;
  // console.log(`latitude: ${data[0].lat} longitude: ${data[0].lon}`);
  // console.log(`latitude: ${lati} longitude: ${long}`);
  $('#city-name').text(data[0].name + "  ");

  weatherAPI();
    })
  .catch(function (err) {
    console.error(err);
  });
};
// weather api call
function weatherAPI() {
  var oneCallWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`;
  // console.log(oneCallWeather);
  // console.log(`latitude: ${lati} longitude: ${long}`);
// calling the API for the weather of the searched location
  fetch(oneCallWeather)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {

    console.log(data);
    var currentWeatherIcon = data.current.weather[0].icon;
    $('#current-icon').attr('src', `https://openweathermap.org/img/w/${currentWeatherIcon}.png`).attr('width', '90').attr('height', '90');
    $('#temp').text(data.current.temp + ' °F');
    $('#hum').text(data.current.humidity + '%');
    $('#wind').text(data.current.wind_speed + ' mph');
    $('#uvi').text(data.current.uvi);
    if (data.current.uvi < 3) {
      $('#uvi').addClass('uvlow');
    } else if (data.current.uvi < 6) {
      $('#uvi').addClass('uvmedlow');
    } else if (data.current.uvi < 8) {
      $('#uvi').addClass('uvmedhigh');
    } else if (data.current.uvi < 11) {
      $('#uvi').addClass('uvhigh');
    } else {
      $('#uvi').addClass('uvextreme');
    };

// code to build weather cards
$('#fivedaycards').empty();
    for (var i = 1; i < 6; i++) {
      var fivedayCol = $('<div class="col-12 col-md-6 col-lg mb-3 forecastcard">');
      var fivedayCard = $("<div class='card'>")
      var fivedayCardBody = $("<div class='card-body'>")
      var fivedayDate = $("<h5 class='card-title'>");
      var fivedayIcon = $("<img>");
      var fivedayTemp = $("<p class='card-text mb-0'>");
      var fivedayHumidity = $("<p class='card-text mb-0'>");
      var IconImg = data.daily[i].weather[0].icon;
      var dateDiff = moment.unix(data.daily[i].dt).format('L');

      fivedayIcon.attr('src', `https://openweathermap.org/img/w/${IconImg}.png`);
      fivedayIcon.attr('alt', IconImg);
      fivedayDate.html(dateDiff);
      fivedayTemp.html('Temp: ' + data.daily[i].temp.max + ' °F');
      fivedayHumidity.html('Humidity: ' + data.daily[i].humidity + '%');
      
      // console.log(fivedayDate);
      // console.log(fivedayIcon);
      // console.log(fivedayTemp);
      // console.log(fivedayHumidity);
      // console.log(i);

      fivedayCardBody.append(fivedayDate);
      fivedayCardBody.append(fivedayIcon);
      fivedayCardBody.append(fivedayTemp);
      fivedayCardBody.append(fivedayHumidity);

      fivedayCard.append(fivedayCardBody);
      fivedayCol.append(fivedayCard);
      $('#fivedaycards').append(fivedayCol)
    }
  })
  .catch(function (err) {
    console.error(err);
  });
};
// clear history button's fucntion
function clearHistory() {
  $('#history').empty();
  localStorage.clear();
  searchHistory = [];
  $('clearHistory').addClass('hidden');
}

// various actions users can do and listening for it.
$('.city-search').on('submit', searchButtonHandler);
$('#history').on('click','li.pastBtn', historyButtonHandler);
$('#clearHistory').on('click', clearHistory);
// On page load
showHistory();