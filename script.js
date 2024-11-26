const apiKey = dotenv.API_KEY;
const apiURL = dotenv.API_URL;

const searchBox = document.querySelector(".search .city-name");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(cityName) {
    try {
        const response = await fetch(apiURL + cityName + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        
        const weatherMain = data.weather[0].main;
        if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherMain === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else {
            weatherIcon.src = "images/clear.png";
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        alert(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value;
    if (cityName) {
        checkWeather(cityName);
    } else {
        alert("Please enter a city name.");
    }
});
