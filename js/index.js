import '../styles/styles.css';
import '../index.html';

const apiKey = "886705b4c1182eb1c69f28eb8c520e20";

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
  }
*/


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
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      //let resultsHTML = "";
      
      
      //document.querySelector(".js-forecast-temperature").innerHTML = dailyTemperature;
      //document.querySelector(".forecast-icon").innerHTML = dailyIcon;
      
      for(let i=0; i<4; i++ ){
        
        let dailyIcon = data.daily[i].weather[0].icon;
        
        let dailyTemperature = Math.floor(data.daily[i].temp.day);
        
        let newElement = document.createElement('div');

       

       // document.querySelector(".forecast-container").innerHTML = 
       newElement.innerHTML = `
        <div class="forecast-day">
          <div class="day">Monday</div>
              <div class="forecast-icon"><img src="./icons/${dailyIcon}.png"></div>
              <div class="forecast-temperature js-forecast-temperature">${dailyTemperature}</div>
              <div class="forecast-description">Clear</div>
            </div>
        `;
        document.querySelector(".forecast-container").appendChild(newElement);
      }
    })
      
      
      
      
      //console.log(data)
      
      /*for (let i=0; i<5; i++){
        
        

       
        let forecast = `
        
        <div class="forecast-day">
        <div class="day">Monday</div>
            <div class="forecast-icon">icon</div>
            <div class="forecast-temperature js-forecast-temperature">${day}</div>
            <div class="forecast-description">Clear</div>
          </div>
          <div class="forecast-day">
            <div class="day">Monday</div>
            <div class="forecast-icon">icon</div>
            <div class="forecast-temperature js-forecast-temperature">22</div>
            <div class="forecast-description">Clear</div>
          </div>
          <div class="forecast-day">
            <div class="day">Monday</div>
            <div class="forecast-icon">icon</div>
            <div class="forecast-temperature js-forecast-temperature">22</div>
            <div class="forecast-description">Clear</div>
          </div>
          <div class="forecast-day">
            <div class="day">Monday</div>
            <div class="forecast-icon">icon</div>
            <div class="forecast-temperature js-forecast-temperature">22</div>
            <div class="forecast-description">Clear</div>
          </div>`;
          const { day } = data.daily[i].temp;
        forecastTemperature.textContent = Math.floor(day);
        const { icon } = data.daily[i].weather[0];
        forecastIcon.innerHTML = `<img src="./icons/${icon}.png">`;
        console.log(data);

          document.getElementById("forecast-container").innerHTML = forecast;
      //const { day } = data.daily[1].temp;
      //forecastTemperature2.textContent = Math.floor(day2);
      }*/
    
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
