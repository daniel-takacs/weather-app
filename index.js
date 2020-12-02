const apiKey = "e9814b1d14446057a91548c564c18fb5";

window.addEventListener("load", () => {
  let lon;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationIcon = document.querySelector(".weather-icon");
  let locationCity = document.querySelector(".location-city");
  const json = (response) => response.json();
  const results = (data) => {
    const { temp } = data.main;
    temperatureDegree.textContent = Math.round(temp);
    const { main } = data.weather[0];
    temperatureDescription.textContent = main;
    locationCity.innerText = `${data.name} ${data.sys.country}`;
    const { icon } = data.weather[0];
    locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

// fahrenheit conversion

    const fahrenheit = temp * 1.8 + 32;
    const degree = document.querySelector('.temperature-degree');
    const degreeSpan = document.querySelector('.degree-section span:nth-child(3)')
  
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

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
        .then(json)

        .then(results)
        .catch(errorhandle);
    });
  }

  //get weather by city searching
  
  const searchbox = document.querySelector(".search-box");
  searchbox.addEventListener("keypress", query);

  function query(e) {
    if (e.keyCode === 13) {
      getResults(searchbox.value);
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
});
