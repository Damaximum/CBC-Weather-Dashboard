# Coding Bootcamp: Weather Dashboard

This is my submission for UCSD's Coding Bootcamp Homework #6.

## Objective

The objective of this homework is to use all the knowledge of APIs, such as calling them and parsing the information we want from them, and create a dashboard that displays the current and the next 5 days' weather based on the city you search.

## Links

Github: https://github.com/Damaximum/CBC-Weather-Dashboard

Webpage:  https://damaximum.github.io/CBC-Weather-Dashboard/

## Screenshots

Webpage Load:
![Alt text](./screenshots/1-Start.png?raw=true "Webpage Load")

Weather Functionality: 
![Alt text](./screenshots/2-Weather.png?raw=true "Weather Functionality")

History Functionality: 
![Alt text](./screenshots/3-History.png?raw=true "History Functionality")

History Callback Functionality:
![Alt text](./screenshots/4-History2.png?raw=true "History Callback Functionality")

## Process

Same process as always for me. Looking through the given acceptance criteria and fulfilling it. However, for this one, I had to break downs some of the steps further.

### HTML and CSS
Now armed with the knowledge of the existence and usage of Bootstrap, most of the page styling used Bootstrap. The only things used in CSS is some custom designs for the search bar and preparations for JS-CSS interactions. The HTML was designed originally based on a wireframe I had drawn on paper (It is something I do with all projects along with a function flowchart).

### Weather API
I signed up for an API key from the given weather API. After reading through the documentation, I realised I could get away with only 2 calls to the API. One for the geolocation of the searched city, and one for all the other information needed for the weather display. 

Once signed up, I tested the API and the information that is sent back. Figuring out the syntax for the calls, I started work on the JS. Later I would go through the test API calls to figure out where the information I needed was, as well as if there was a need to convert it into more legible forms (There was).

### Javascript
The JS was probably the most complex and time consuming part, causing me to also modify and even rewrite parts of the HTML. 
#### Start
I started out with the current weather card (on a jumbotron now) and figured out getting the user input, putting it through the Geolocation API and retrieving the latitude and longitude (necessary for the Weather API). Then I got the latitude and longitude into the Weather API and retrieved the current weather. This was then displayed onto the current weather jumbotron, displaying the location, temperature, icon, humidity, UV index, and wind speed. The time needed something else, so I turned to moment.js. I used it to display the current time on the jumbotron. 
#### API - Current Weather
One thing that came up that was problematic was the assymetrical loading from the two APIs. I solved this by putting the Weather API function inside the Geolocator function, kind of forcing the code to load one after the other. This was important since I could not run the Weather API without the information from the Geolocator.
#### API - 5-day Forecast
Then I worked on the 5-day forecast. I approached this by creating cards via a for loop (due the API sending 7 days instead of just 5, I had to limit it in some way.) then assigning the different information, in this case, the date, icon, temperature, and humidity. The date in this case needed moment. The API sends back the date in Unix, so I had to use Method to convert it into a format that looked nice.
#### History
Finally I worked on the history. The displaying part was the easiest, running a for loop and creating a [<li>] for each item in an array I had set up that retrieved from a local storage (I had done similar things in previous homeworks). Then I added a function to "retrieve" a previously searched city and a listener to listend for the user to click on one of the [<li>] I had created. Finally, to make things neater and more user friendly, I added a clear history button, and managed to code out a way for the history to "move" a repeated search to the top, making the history represent history based on search time.