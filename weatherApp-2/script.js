const wrapper = document.querySelector(".wrapper"),
    inputPart = wrapper.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    wIcon = document.querySelector(".weather-part img"),
    arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e => {
    //if user pressed enter btn and input value is not empty
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { //if browser support geolocation
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords; //getting lat and lon of the user device from coords obj
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2501969fb7ff4df90a8dd500e3ad7522`;
    fetchData();
}

function onError(error) {
    infoTxt.innerHTML = error.message;
    infoTxt.classList.add("error")
}

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2501969fb7ff4df90a8dd500e3ad7522`;
    fetchData();
}

function fetchData() {
    infoTxt.innerHTML = "Getting weather details...";
    infoTxt.classList.add("pending");
    //getting api response and returning it with parsing into js and in another
    //then function calling weatherDetails function with passing api result as an argument
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info) {
    infoTxt.classList.replace("pending", "error");
    if (info.cod == "404") {
        infoTxt.innerHTML = `${inputField.value} isn't a valid city name`;
    } else {
        //let's get required propertis value from the info object
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { feels_like, humidity, temp } = info.main;

        //using custom icon according to the id which api return us
        if (id == 800) {
            wIcon.src = "img/clear.svg";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "img/strom.svg";
        } else if (id >= 600 && id <= 622) {
            wIcon.src = "img/snow.svg";
        } else if (id >= 701 && id <= 781) {
            wIcon.src = "img/haze.svg";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "img/cloud.svg";
        } else if (id >= 300 && id <= 321 || id >= 500 && id <= 531) {
            wIcon.src = "img/rain.svg";
        }

        //let's pass these values to a particular html element
        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);;
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoTxt.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
});