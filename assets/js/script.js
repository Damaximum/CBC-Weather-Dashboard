var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
var searchItem = $('#search-item').val().trim(); 
var apiKey = '60fa7450d0005ff99e2958708928b28a';
var geoLoc = 'http://api.openweathermap.org/geo/1.0/direct?q='+ searchItem + '&limit=5&appid=' + apiKey;
var oneCallWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=minutely,hourly&appid=' + apiKey;
var lat;
var long;
var city;

// getting the current date via method. *Might not be necessary*
var currentDay = moment().format('(MM/DD/YYYY)');
$('#date').text(currentDay);

// creating the search history
for (var i = 0; i < searchHistory.length; i++) {
    $('#history').add(`<li class="list-group-item pastBtn" data-city="${city}">`).text(searchHistory[i]);
}


// Search button functionality



// calling the API for location based on search bar to get latitude and longitude
fetch(geoLoc)
.then(function (res) {
  return res.json();
})
.then(function (data) {
 //make your second call here so that you have access to "data"
  })
.catch(function (err) {
  console.error(err);
});
// calling the API for the weather of the searched location
fetch(oneCallWeather)
.then(function (res) {
  return res.json();
})
.then(function (data) {
 //make your second call here so that you have access to "data"
  })
.catch(function (err) {
  console.error(err);
});