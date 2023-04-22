const fetchDataButton = document.getElementById("fetchData");

const openWeatherKeyName = "509f664697a905dd6c4cf632844aeee0";

let latArr = document.querySelectorAll('.lat');
let longArr = document.querySelectorAll('.long');
let mapDiv = document.getElementById("map");

const currPosition = {};

function getLocation() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position){
    document.getElementById('fetchData').style.display = "none";
    document.getElementById('main-body').style.display = "block";
    currPosition.lat = position.coords.latitude;
    currPosition.long = position.coords.longitude;
    latArr.forEach((ele) => {
        ele.innerHTML = "Lat: " + position.coords.latitude;
    });
    longArr.forEach((ele) => {
        ele.innerHTML = "Long: " + position.coords.longitude;
    });

    displayMap(currPosition.lat, currPosition.long);
    fetchWeatherData(currPosition.lat, currPosition.long);
}

function displayMap(latitude, longitude) {
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&output=embed`;
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', mapUrl);
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('style', 'border:0');
  
    mapDiv.appendChild(iframe);
}

function fetchWeatherData(latitude, longitude) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKeyName}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById('location').innerHTML = "Location: " + data.name + " " + data.sys.country;
        document.getElementById('timeZone').innerHTML = "TimeZone: " + data.timezone;
        document.getElementById('windSpeed').innerHTML = "Wind Speed: " + data.wind.speed;
        document.getElementById('pressure').innerHTML = "Pressure: " + data.main.pressure;
        document.getElementById('humidity').innerHTML = "Humidity: " + data.main.humidity;
        document.getElementById('windDirection').innerHTML = "Wind Direction: " + data.wind.deg + " deg";
        document.getElementById('uvIndex').innerHTML = "UV Index: " + data.weather[0].description;
        document.getElementById('feelsLike').innerHTML = "Feels Like: " + data.main.feels_like;
      })
      .catch(error => {
        console.log(error);
      });
  }

// document.getElementById("fetchData").addEventListener("click", getLocation);

fetchDataButton.addEventListener("click", event => {
    // Hide the fetch data button and show the data container
    event.preventDefault();
    getLocation();
});


// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=c58308e4490aa1325e2b6aba3a805e31
