const submit = document.querySelector('.submit');
const input = document.querySelector('.search-box');
const location2 = document.querySelector('.location');
const weekly = document.querySelector('.weekly');

const api = {
  key: "9756c2a24b10e89bad656e6374a862b5",
  base: "https://api.openweathermap.org/data/2.5/"
}

//when pressing the SUBMIT button the function is executed
window.onload = function (){
    submit.addEventListener('click', function(){
    getForecast(input.value);
});
}

function getForecast (query) {
  
  //get today's weather forecast
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResults)
    .catch(err => window.alert("The city you entered does not exist! Please try again!"));  

  //get the weather forecast for the next 5 days
  fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    })
    .then(displayResultsWeekly)
    .catch(err => window.alert("The city you entered does not exist! Please try again!"));
}

//display today's weather forecast
function displayResults (weather) {

  let currentDate = new Date();

  location2.innerHTML = `
            <div class="city">${weather.name}, ${weather.sys.country}</div>
            <div class="date">${dateBuilder()}</div>
            <div class="temp">${Math.round(weather.main.temp)}<span>°C</span></div>
            <div class="weather">${weather.weather[0].main}</div>
            <div class="low"><i class="fas fa-temperature-low"></i> ${weather.main.temp}°C</div>
            <div class="hi"><i class="fas fa-temperature-high"></i> ${weather.main.temp_max}°C</div>
            <div class="humidity"><i class="fas fa-umbrella"></i>${weather.main.humidity}%</div>
            <div class="wind"><i class="fas fa-wind">${weather.wind.speed}km/h</i></div>
  `;
}

//display the weather forecast for the next 5 days
function displayResultsWeekly (weather) {
  
  let currentDate = new Date();
  let date = [];
  let minTemp = [];
  let maxTemp = [];
  let humidity = [];
  let imgSrc = [];
  let weekDays = [];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = new Date().getDay();
  today++;

  for(let i=weather.list.length-1; i > 2; i-=8){
    let aux = (weather.list[i].dt_txt).split(' ')
    let aux2 = aux[0].split('-');
    aux=aux2[1]+"/"+aux2[2];
    date.push(aux);
    minTemp.push(weather.list[i].main.temp_min);
    maxTemp.push(weather.list[i].main.temp_max);
    humidity.push(weather.list[i].main.humidity);
    weekDays.push(days[today]);
    today++;

    if (today==7){
      today = 0;
    }

    if(weather.list[i].main.humidity<50){
      imgSrc.push("fas fa-sun");
    }
    else{
      imgSrc.push("fas fa-cloud-sun");
    }
  }

  weekly.innerHTML = '';
  for(let i=5;i>0;i--){

    weekly.innerHTML +=`
          <div class="banner">
            <div class="column">
              <div class="row"><h3>${weekDays.shift()}</h3></br></div>
              <div class="row"><i class="${imgSrc.pop()}" style="color:#EC9706"></i><h4>${date.pop()}</h4></br></div>
              <div class=row><i class="fas fa-temperature-low"></i>${minTemp.pop()}<span>°C</span></div>
              <div class="row"><i class="fas fa-temperature-high"></i>${maxTemp.pop()}<span>°C</span></div>
              <div class="row"><i class="fas fa-umbrella"></i>${humidity.pop()}<span>%</span></div>
            </div> 
          </div>  
        `;
  }
}

function dateBuilder(){
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, '0');
  let month = String(currentDate.getMonth() + 1).padStart(2, '0');
  let year = currentDate.getFullYear();

  currentDate = month + '/' + day + '/' + year;
  
  return `${currentDate}`;
}

module.exports = dateBuilder;