//site background

var i = 0;
var images = [];
var time = 4000;

images[0] = 'imgs/187818.jpg';
images[1] = 'imgs/187819.jpg';
images[2] = 'imgs/187820.jpg';
images[3] = 'imgs/187821.jpg';
images[4] = 'imgs/187822.jpg';

function changimg(){
    document.slide.src = images[i];

    if(i<images.length - 1){
        i++;
    }else{
        i = 0;
    }
    setTimeout("changimg()" , time);
}
window.onload = changimg;

//weather informaion

const apiKey = 'deae09f0034fab7ee3a7cc1fc60e0dfe'; 
const weatherForm = document.getElementById('weather-form');
const weatherResult = document.getElementById('weather-result');
const input = document.getElementById('input');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;
    getWeather(city);
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    if (data.cod === '404') {
        alert('City not found');
        return;
    }

    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const city = data.name;
    const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherResult.innerHTML = `
        <img src="${weatherIcon}" class="img-weather">
        <h1>${temperature}°C</h1>
        <h2>${city}</h2>
        <div class="butome">
            <div class="humidity">
                <img src="images/humidity.png">
                <div class="p">
                  <p>${humidity}%</p>
                  <p>humidity</p>   
                </div>
            </div>
            <div class="wind-speed">
                <img src="images/wind.png">
                <div class="p">
                   <p>${windSpeed}Km/h</p>
                   <p>wind speed</p>
                </div>
            </div>
        </div>
    `;
}

// Add prayer times

const prayerTimesResult = document.getElementById('prayer-times-result');

function getPrayerTimes(city) {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=&method=2`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPrayerTimes(data.data.timings);
        })
        .catch(error => {
            console.error('Error fetching prayer times:', error);
        });
}

function displayPrayerTimes(timings) {
    prayerTimesResult.innerHTML = `
        <hr>
        <div class="PrayerTime">
            <h2>Fajr</h2>
            <p>${timings.Fajr}</p>
        </div>
        <hr>
        <div class="PrayerTime">
            <h2>Dhuhr</h2>
            <p> ${timings.Dhuhr}</p>
        </div>
        <hr>
        <div class="PrayerTime">
            <h2>Asr</h2>
            <p>${timings.Asr}</p>
        </div>
        <hr>
        <div class="PrayerTime">
            <h2>Maghrib</h2>
            <p>${timings.Maghrib}</p>
        </div>
        <hr>
        <div class="PrayerTime">
            <h2>Isha</h2>
            <p>${timings.Isha}</p>
        </div>
        <hr>
    `;
}

// search with weather in input 

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;
    getWeather(city);
    getPrayerTimes(city);
});
