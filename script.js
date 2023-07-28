//https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid={API key}

//https://api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=a357d61c1da50d705184c505ca330263

//https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=a357d61c1da50d705184c505ca330263

const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const api_key = "3ba0e5eedae49070b51c85ad8c30def0";

const serach_box = document.getElementById("serach-box");
const serach_btn = document.getElementById("serach-btn");
const display_card = document.getElementById("weatherCard");
const weather_Conatiner = document.getElementById("days_forecast");

async function fetchWeather(city) {
  const response = await fetch(url + city + `&appid=${api_key}`);
  var data = await response.json();
  console.log(data);

  let locationIcon = document.getElementById("weather-icon");
  const { icon } = data.weather[0];
  locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

  document.getElementById("city").innerHTML = data.name;
  document.getElementById("temp").innerHTML = data.main.temp + "°C";
  document.getElementById("min_temp").innerHTML ="Min Temperature:" + data.main.temp_min + "°C";
  document.getElementById("max_temp").innerHTML ="Max Temperature:" + data.main.temp_max + "°C";
  document.getElementById("humidity").innerHTML = data.main.humidity + "%";
  document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
  document.getElementById("description").innerHTML = data.weather[0].description;

  fetchFiveDaysForecast(data.coord.lat, data.coord.lon);
}

// function fievDaysApi(){
//     fetch("https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=a357d61c1da50d705184c505ca330263&cnt=5")
//     .then((res) =>  res.json())
//     .then((data1) => console.log(data1))
//     .catch((error) => console.log(error))

// }
//fievDaysApi();

async function fetchFiveDaysForecast(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${api_key}`
  );
  const data = await response.json();
  console.log(data);

  const dailyForecast = data.daily.slice(1, 6); // Get forecast for the next 5 days

  dailyForecast.forEach((item, index) => {
    const dayElement = document.getElementById(`day${index + 1}`);
    const iconElement = document.getElementById(`img${index + 1}`);
    const minTempElement = document.getElementById(`day${index + 1}Min`);
    const maxTempElement = document.getElementById(`day${index + 1}Max`);

    const { icon } = item.weather[0];
    const minTemp = item.temp.min;
    const maxTemp = item.temp.max;
    const forecastDate = new Date(item.dt * 1000).toLocaleDateString("en-US", {month: "long",day:"numeric"});

    dayElement.textContent = forecastDate;
    iconElement.src = `icons/${icon}.png`;
    minTempElement.textContent = `Min: ${minTemp}°C`;
    maxTempElement.textContent = `Max: ${maxTemp}°C`;
  });
}

serach_btn.addEventListener("click", () => {
  fetchWeather(serach_box.value);
  serach_box.value = "";
  display_card.style.display = "block";
  weather_Conatiner.style.display = "block";
});
