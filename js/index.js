import '../styles/styles.css';
import '../index.html';

const apiKey = "886705b4c1182eb1c69f28eb8c520e20";

window.addEventListener("load", () => {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector(".js-temperature-description");
  let temperatureDegree = document.querySelector(".js-temperature-degree");
  let locationIcon = document.querySelector(".js-weather-icon");
  let locationCity = document.querySelector(".js-location-city");
  let wind = document.querySelector(".js-wind");
  let jsHumidity = document.querySelector(".js-humidity");

// API

  const json = (response) => response.json();
  const currentDataByLocation = (data) => {
    const { temp } = data.main;
    temperatureDegree.textContent = Math.round(temp);
    const { description } = data.weather[0];
    temperatureDescription.textContent = description;
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

  //get weather by geolocation

  const forecastDataByLocation = (data)=> {
    
    for(let i=1; i<6; i++){
      let date = new Date(data.daily[i].dt * 1000);
      let days = ['Sunday', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
      let name = days[date.getDay()];

      let dailyIcon = data.daily[i].weather[0].icon;
      
      let dailyTemperature = Math.floor(data.daily[i].temp.day);
      let dailyDescription = data.daily[i].weather[0].description;
      let newElement = document.createElement('div');

     newElement.innerHTML = `
      <div class="forecast-day">
        <div class="day">${name}</div>
            <div class="forecast-icon"><img src="./icons/${dailyIcon}.png"></div>
            <div class="forecast-temperature js-forecast-temperature">${dailyTemperature}</div>
            <div class="forecast-description">${dailyDescription}</div>
          </div>
      `;
      document.querySelector(".forecast-container").appendChild(newElement);
  }
  }

  const currentWeatherByPosition = ()=> {
    fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  )
    .then(json)
    .then(currentDataByLocation)
    .catch(errorhandle);
  }
  const forecastByPosition = () => {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`)
    .then(json)
    .then(forecastDataByLocation)
    .catch(errorhandle);
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      currentWeatherByPosition();
      forecastByPosition();

    });

    }

  //get weather by city searching
  
  const searchbox = document.querySelector(".js-search-box");
  searchbox.addEventListener("keypress", query);

  function query(e) {
    if (e.keyCode === 13) {
      getResults(searchbox.value);
      getForecastByCityId(searchbox.value);
      e.preventDefault();
      searchbox.value = "";
    }
  }
  function getResults(query) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
    )
      .then(json)
      .then(currentDataByLocation)
      .catch(errorhandle);
  }

const dataForecastByCity = (data) => {
  console.log(data);
  for(let i=1; i<6; i++){
    let date = new Date(data.list[i].dt * 1000);
    let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    let name = days[date.getDay()];

    let dailyIcon = data.list[i].weather[0].icon;
    
    let dailyTemperature = Math.floor(data.list[i].temp.day);
    let dailyDescription = data.list[i].weather[0].description;
    let newElement = document.createElement('div');

   newElement.innerHTML = `
    <div class="forecast-day">
      <div class="day">${name}</div>
          <div class="forecast-icon"><img src="./icons/${dailyIcon}.png"></div>
          <div class="forecast-temperature js-forecast-temperature">${dailyTemperature}</div>
          <div class="forecast-description">${dailyDescription}</div>
        </div>
    `;
    
    document.querySelector(".forecast-container").appendChild(newElement);
    
}
}

  function getForecastByCityId(query) {
    document.querySelector(".forecast-container").innerHTML = '';
    fetch(
     `https://api.openweathermap.org/data/2.5/forecast/daily?q=${query}&cnt=7&appid=${apiKey}`
    )
      .then(json)
      .then(dataForecastByCity)
      .catch(errorhandle);
  }

});
