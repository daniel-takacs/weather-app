import '../styles/styles.css';
import '../index.html';

const apiKey = "e9814b1d14446057a91548c564c18fb5";

window.addEventListener("load", () => {
  let lon;
  let lat;

  let temperatureDescription = document.querySelector(
    ".js-temperature-description"
  );
  let temperatureDegree = document.querySelector(".js-temperature-degree");
  let locationIcon = document.querySelector(".js-weather-icon");
  let locationCity = document.querySelector(".js-location-city");
  let wind = document.querySelector(".js-wind");
  let jsHumidity = document.querySelector(".js-humidity");


// Forecast
  let forecastTemperature = document.querySelector(".js-forecast-temperature")

// API

  const json = (response) => response.json();
  const results = (data) => {
    const { temp } = data.main;
    temperatureDegree.textContent = Math.round(temp);
    const { main } = data.weather[0];
    temperatureDescription.textContent = main;
    locationCity.innerText = `${data.name} ${data.sys.country}`;
    const { icon } = data.weather[0];
    locationIcon.innerHTML = `<img src="./icons/${icon}.png">`;
    const { speed } = data.wind;
    wind.textContent = speed;

    const { humidity } = data.main;
    jsHumidity.textContent = humidity;

    
// fahrenheit conversion

    const fahrenheit = temp * 1.8 + 32;
    const degree = document.querySelector('.js-temperature-degree');
    const degreeSpan = document.querySelector('.js-degree-section span:nth-child(3)')
  
    degree.addEventListener('click', ()=> {
      
      if (degreeSpan.textContent === "C") {
        degreeSpan.textContent = "F";
        degree.textContent = Math.round(fahrenheit);
      } else {
        degreeSpan.textContent = "C";
        degree.textContent = Math.round(temp);
      }
    })
  };

  const errorhandle = (error) => {
    console.error("Error: ", Error);
  };

  /*const resultsForecast = (dataResults) => {

    const { temp } = dataResults.list;
    forecastTemperature.textContent = temp;
  }*/



  //get weather by geolocation

  const positionWeather = ()=> {
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then(json)

    .then(results)
    .catch(errorhandle);
  }
  const positionForecast = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=4&appid=${apiKey}`)
    .then(json)
    .then(resultsForecast)
    console.log(resultsForecast)
    .catch(errorhandle);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      positionWeather();
      positionForecast();

    });

    }

  //get weather by city searching
  
  const searchbox = document.querySelector(".js-search-box");
  searchbox.addEventListener("keypress", query);

  function query(e) {
    if (e.keyCode === 13) {
      getResults(searchbox.value);
      getForecast(searchbox.value);
      e.preventDefault();
      searchbox.value = "";
    }
  }
  function getResults(query) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
    )
      .then(json)
      .then(results)
      .catch(errorhandle);
  }

  function getForecast(query) {
    fetch(
      `api.openweathermap.org/data/2.5/forecast/daily?q=${query}&cnt=4&appid=${apiKey}`
    )
      .then(json)
      .then(results)
      .catch(errorhandle);
  }

});
