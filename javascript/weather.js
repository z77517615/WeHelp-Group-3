// get weather api function
async function getWeatherApi() {
    let res = await fetch(
        "https://opendata.cwb.gov.tw/api//v1/rest/datastore/F-C0032-001?Authorization=CWB-42E74828-0F3E-4A91-8B07-3F956E27BC37"
    );
    let resJson = await res.json();
    return resJson;
}

// get weather data with api async function
getWeatherApi().then((res) => {
    let location = [];
    let weatherName = [];
    let weatherValue = [];
    let minTemp = [];
    let maxTemp = [];
    let rain = [];
    // stored data into different variables
    for (let i = 0; i < 22; i++) {
        // LOCATION
        location.push(res.records.location[i].locationName);

        // WEATHER Name
        let weatherNameSeperate = [];
        for (let x = 0; x < 3; x++) {
            weatherNameSeperate.push(
                res.records.location[i].weatherElement[0].time[x].parameter
                    .parameterName
            );
        }
        weatherName.push(weatherNameSeperate);

        // WEATHER Value
        let weatherValueSeperate = [];
        for (let x = 0; x < 3; x++) {
            weatherValueSeperate.push(
                res.records.location[i].weatherElement[0].time[x].parameter
                    .parameterValue
            );
        }
        weatherValue.push(weatherValueSeperate);

        // RAIN
        let rainSeperate = [];
        for (let x = 0; x < 3; x++) {
            rainSeperate.push(
                res.records.location[i].weatherElement[1].time[x].parameter
                    .parameterName
            );
        }
        rain.push(rainSeperate);

        // MIN TEMPERATURE
        let minTempSeperate = [];
        for (let x = 0; x < 3; x++) {
            minTempSeperate.push(
                res.records.location[i].weatherElement[2].time[x].parameter
                    .parameterName
            );
        }
        minTemp.push(minTempSeperate);

        // MAX TEMPERATURE
        let maxTempSeperate = [];
        for (let x = 0; x < 3; x++) {
            maxTempSeperate.push(
                res.records.location[i].weatherElement[4].time[x].parameter
                    .parameterName
            );
        }
        maxTemp.push(maxTempSeperate);
    }

    // insert weather date by city function
    function insertWeather(city) {
        let index = location.indexOf(city);
        // insert temperature
        let div_temperature = document.querySelector("div.temperature");
        div_temperature.innerText = `${minTemp[index][0]} - ${maxTemp[index][0]} ℃`;

        // insert location
        let div_location = document.querySelector("div.location");
        div_location.innerText = `${location[index]}`;

        // insert weather
        let div_weather = document.querySelector("div.weather");
        div_weather.innerText = weatherName[index][0];

        // insert date
        let month = new Date().getMonth() + 1;
        let date = new Date().getDate();
        let div_date = document.querySelector("div.date");
        div_date.innerText = `${month}月${date}日`;

        // insert rain probability
        let div_rainProbability = document.querySelector(
            "div.rain-probability"
        );
        div_rainProbability.innerText = `${rain[index][0]}%`;

        // insert background image
        let main = document.querySelector("main");
        main.style.backgroundImage = `url('../weatherImage/params-${weatherValue[index][0]}.jpeg')`;
    }

    // insert taipei data into index.html by default
    insertWeather("臺北市");

    // change data when click different city
    let div_sideMenu = document.querySelector("div.side-menu");
    div_sideMenu.addEventListener("click", (e) => {
        let city = e.target.innerText;
        insertWeather(city);
    });
});

// insert time
function insertTime() {
    let div_time = document.querySelector("div.time");
    let time = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
    });
    div_time.innerText = time;
}

insertTime();

setInterval(() => {
    insertTime();
}, 1000);
